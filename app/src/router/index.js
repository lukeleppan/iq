import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProblemCreate from "../views/admin/ProblemCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: Admin,
  // },
  {
    path: "/admin/create",
    name: "Create Problem",
    component: ProblemCreate,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
