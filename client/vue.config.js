module.exports = {
  publicPath: '/screenlife-analytics/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api/*": {
        target: "http://webserver:8081/api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/socket.io*": {
        target: "http://webserver:8081/socket.io",
        changeOrigin: true,
        pathRewrite: {
          "^/socket.io": ""
        }
      }
    }
  },
  lintOnSave: undefined,
  runtimeCompiler: true
};
