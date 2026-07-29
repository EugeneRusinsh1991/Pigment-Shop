async function safeClick(page, pageData, report, selector, description) {
  report.summary.totalInteractionsAttempted++;
  pageData.testedInteractions.push(description);
  try {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.click({ timeout: 15000 });
    await page.waitForTimeout(1500);
    pageData.successfulInteractions.push(description);
    report.summary.successfulInteractions++;
    return true;
  } catch (err) {
    console.error(`❌ Click failed: ${description}`, err.message);
    pageData.failedInteractions.push(description);
    pageData.detectedErrors.push(`Failed to click "${description}": ${err.message}`);
    report.summary.failedInteractions++;
    return false;
  }
}

async function safeFill(page, pageData, report, selector, value, description) {
  report.summary.totalInteractionsAttempted++;
  pageData.testedInteractions.push(description);
  try {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.fill(value, { timeout: 15000 });
    await page.waitForTimeout(500);
    pageData.successfulInteractions.push(description);
    report.summary.successfulInteractions++;
    return true;
  } catch (err) {
    console.error(`❌ Fill failed: ${description} with value "${value}"`, err.message);
    pageData.failedInteractions.push(description);
    pageData.detectedErrors.push(`Failed to fill "${description}": ${err.message}`);
    report.summary.failedInteractions++;
    return false;
  }
}

module.exports = {
  safeClick,
  safeFill,
};
