import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import i18next from "i18next";
import VueI18Next from "@panter/vue-i18next";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueI18Next);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import de_de from "./locales/de_de/translation.js";

i18next.init({
  lng: "de",
  resources: {
    de: { translation: de_de }
  }
});

const i18n = new VueI18Next(i18next);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
