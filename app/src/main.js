import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

const socket = io(process.env.VUE_APP_API_URL, {
  path: "/ws/",
  autoConnect: false,
});
const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  maxToasts: 5,
  queue: true,
};

createApp(App)
  .use(store)
  .use(router)
  .use(VueSocketIOExt, socket, { store })
  .use(Toast, toastOptions)
  .mount("#app");
