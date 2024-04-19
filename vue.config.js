'use strict';
const path = require('path');
const Timestamp = new Date().getTime();
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  filenameHashing: true, // 默认 true
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
    },
  },
  configureWebpack: {
    output: {
      filename: 'js/[name].'+Timestamp+'.js',
      chunkFilename: 'js/[name].'+Timestamp+'.js'
   },
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    }
  },
  devServer: {
    port: 888, // 项目运行的端口号
    open: true, // 是否自动打开浏览器页面
  },
  lintOnSave: true,
};
