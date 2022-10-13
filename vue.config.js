const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {extensions: [".ts", ".tsx", ".js", ".json"]},
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
      ]
    }
  },
  devServer: {
    static: {
      directory: './public',
    },
    host: 'localhost',
    port: 8080, //端口号
    allowedHosts: 'all',
    hot: true,
    open: true,
    proxy: {
      '/open': {
        target: 'http://api-open.qingzhuyun.com/',
        changeOrigin: true,
      },
    },
    historyApiFallback: true
  },
})
