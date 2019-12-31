import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/main.css";
import i18n from "./i18n";

Vue.prototype.$http = axios;
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {
  // use the language form the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = "en";
  }

  // set the current language for i18n
  i18n.locale = language;
  next();
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
