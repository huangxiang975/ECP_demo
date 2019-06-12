module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: process.env.VUE_APP_TAEGET,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': '' // rewrite path
        }
      },
    },
  },
};