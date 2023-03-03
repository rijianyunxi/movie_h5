const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  publicPath:"/",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  transpileDependencies: true
})
