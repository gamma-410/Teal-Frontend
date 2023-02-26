const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'public/img/icon.png',
    }
  }
};