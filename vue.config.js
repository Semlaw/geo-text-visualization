const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/geo-text-visualization/' : '',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
      .set('svs', resolve('svs'));
  }
};
