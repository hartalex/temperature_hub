module.exports = {
  'extends': ['standard', 'eslint:recommended', 'plugin:react/recommended', 'plugin:flowtype/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'standard',
    'promise',
    'react',
    'jsx',
    'jsx-a11y',
    'import',
    'flowtype'
  ],
  'globals': { 'fetch': false, 'describe': false, 'it': false , 'alert': false},
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
