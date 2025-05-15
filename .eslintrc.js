module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'import', 'unused-imports', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          { char: '>', alternatives: ['&gt;'] },
          { char: '}', alternatives: ['&#125;'] },
        ],
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': ['error', { html: true, component: true }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: true,
        multiline: 'last',
        reservedFirst: ['key'],
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'import/order': 'off',
  },
};
