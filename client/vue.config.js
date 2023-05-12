module.exports = {
  publicPath: '/screenlife-analytics/',
  devServer: {
    public: "http://104.248.146.20",
    disableHostCheck: true,
    proxy: {
      "/api-screenlife/*": {
        target: "http://webserver:8081/api-screenlife/",
        changeOrigin: true,
        pathRewrite: {
          "^/api-screenlife": ""
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
