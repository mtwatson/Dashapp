module.exports = {
  'env': {
    'browser': false,
    'node': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    // eslint-disable-next-line max-len
    'quotes': [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
  },
};
