module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
  },
  rules: {
    'import/newline-after-import': ['error', { count: 2 }],
    'import/no-extraneous-dependencies': 0,
  },
};
