function isBabelCli(caller) {
  return !!(caller && caller.name === '@babel/cli');
}

module.exports = function(api) {
  const isCli = api.caller(isBabelCli);

  var ignore = undefined;
  if (isCli) {
    ignore = ['src/**/*.spec.js', 'src/**/*.test.js'];
  }

  return {
    minified: true,
    sourceMaps: true,
    comments: false,
    ignore,
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      'transform-regenerator',
      ['minify-mangle-names', {eval: true, topLevel: true}],
    ],
  };
};
