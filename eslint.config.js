module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.expo/**',
      '.git/**',
      '.logs/**',
      '.venv/**',
      '.playwright/**',
      'test-results/**'
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'off', // handled by TypeScript / compiler
      'no-empty': 'warn',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }]
    }
  }
];
