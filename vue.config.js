module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://47.110.250.181:8083/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': '' // rewrite path
        }
      },
    },
  },
};