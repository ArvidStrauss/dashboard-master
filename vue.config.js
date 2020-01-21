module.exports = {
  pluginOptions: {
    i18n: {
      locale: "us",
      fallbackLocale: "us",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  devServer: {
    //URL VOM BACKENDSERVER EINTRAGEN
    proxy: "http://172.17.0.1:8000"
  }
};
