module.exports = {
  'extends': ['standard', 'eslint:recommended', 'plugin:react/recommended'],
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
    'import'
  ],
  'globals': { 'fetch': false, 'describe': false, 'it': false , 'alert': false, 'URL': false},
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
