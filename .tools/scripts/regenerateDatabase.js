import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { regenerateCatalogDatabase } from '../../src/services/catalogDatabaseRegenerator.js';
import { validatePool, mediaPool } from '../../src/constants/mediaPool.js';

export function parseArgs(argv = process.argv.slice(2)) {
  let rootCount = null;
  let skipPrompt = false;
  let mode = 'standard';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--catalogs=')) {
      const val = parseInt(arg.slice('--catalogs='.length), 10);
      if (!isNaN(val)) rootCount = val;
    } else if (arg === '--catalogs' && i + 1 < argv.length) {
      const val = parseInt(argv[i + 1], 10);
      if (!isNaN(val)) {
        rootCount = val;
        i++;
      }
    } else if (arg === '--yes' || arg === '-y') {
      skipPrompt = true;
    } else if (arg === '--low') {
      mode = 'low';
    }
  }

  return { rootCount, skipPrompt, mode };
}

async function promptRootCount() {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question('Введите количество корневых категорий (по умолчанию 3, макс 10): ');
    const trimmed = answer.trim();
    if (!trimmed) return 3;
    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 10) {
      console.log('Некорректное значение, используется 3.');
      return 3;
    }
    return parsed;
  } finally {
    rl.close();
  }
}

const STEP_LABELS = {
  auth: '🔐 [1/5] Аутентификация администратора...',
  fetch_context: '📦 [2/5] Получение существующего контекста БД...',
  clean_data: '🧹 [3/5] Безопасная очистка старых коллекций...',
  generate_data: '✨ [4/5] Генерация новых каталогов, товаров и активности...',
  write_data: '💾 [5/5] Пакетная запись данных в Firestore...',
  complete: '🎉 [Готово] Генерация успешно завершена!',
};

function logProgress(step, percent) {
  const label = STEP_LABELS[step] || `[${step}]`;
  console.log(`${label} [${percent}%] - OK`);
}

async function main() {
  try {
    // Pre-flight CLI validation check
    try {
      validatePool(mediaPool);
    } catch (valErr) {
      console.error('\n❌ Ошибка предварительной проверки пула медиафайлов (Pre-flight media pool check failed):');
      console.error(`   ${valErr.message}`);
      console.error('   👉 Пожалуйста, сначала выполните команду: npm run fetch-media-pool\n');
      process.exitCode = 1;
      return;
    }

    const { rootCount: argRootCount, skipPrompt, mode } = parseArgs();
    const finalRootCount = argRootCount !== null
      ? argRootCount
      : (skipPrompt ? 3 : await promptRootCount());

    console.log(`\n🚀 Запуск генерации базы данных (корневых каталогов: ${finalRootCount}, режим: ${mode})...\n`);

    const result = await regenerateCatalogDatabase({
      mode,
      rootCount: finalRootCount,
      authenticate: true,
      onProgress: logProgress,
    });
    if (!result.success) {
      throw new Error(result.error);
    }
    const { stats, durationMs } = result.data;
    console.log('\n📊 Сводка созданных данных:');
    console.table([
      { 'Сущность': 'Категории (Categories)', 'Количество': stats.categoriesCount },
      { 'Сущность': 'Товары (Products)', 'Количество': stats.productsCount },
      { 'Сущность': 'Отзывы (Reviews)', 'Количество': stats.reviewsCount },
      { 'Сущность': 'Вопросы (Questions)', 'Количество': stats.questionsCount },
      { 'Сущность': 'Заказы (Orders)', 'Количество': stats.ordersCount },
      { 'Сущность': 'Сообщения поддержки (Support)', 'Количество': stats.supportMessagesCount },
      { 'Сущность': 'Заметки администратора (Notes)', 'Количество': stats.adminNotesCount },
    ]);
    console.log(`⏱️ Время выполнения: ${(durationMs / 1000).toFixed(2)}s\n`);
  } catch (error) {
    console.error('\n❌ Ошибка генерации базы данных:', error.message || error);
    process.exitCode = 1;
  }
}

main();
