module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    radix: 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
  },
};
