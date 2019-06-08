const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];

const plugins = [
  'add-module-exports',
  ['module-resolver', {
    root: [__dirname],
  }],
];

module.exports = { presets, plugins };
