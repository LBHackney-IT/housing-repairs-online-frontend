module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:editorconfig/all',
    'next/core-web-vitals'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'editorconfig'
  ],
  'rules': {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'quotes': ['error', 'single']
  }
};
