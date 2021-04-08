import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Registration from "../views/Registration.vue";
import Authentication from "../views/Authentication.vue";
import ConfirmEmail from "../views/ConfirmEmail.vue";
import CancelEmail from "../views/CancelEmail.vue";
import Admin from "../views/Admin.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: Authentication,
  },
  {
    path: "/confirm/:token",
    name: "Confirm",
    component: ConfirmEmail,
  },
  {
    path: "/cancel/:token",
    name: "Cancel",
    component: CancelEmail,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
