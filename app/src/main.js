import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueMeta from "vue-meta";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(VueMeta)
  .mount("#app");
