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
    meta: {
      title: "iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      title: "Create an account | iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: Authentication,
    meta: {
      title: "Sign in to your account | iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
  {
    path: "/confirm/:token",
    name: "Confirm",
    component: ConfirmEmail,
    meta: {
      title: "iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
  {
    path: "/cancel/:token",
    name: "Cancel",
    component: CancelEmail,
    meta: {
      title: "iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin Dashboard | iKhwezi Quiz",
      metaTags: [
        {
          name: "description",
          content: "The Interhouse iKhwezi Quiz!.",
        },
        {
          property: "og:description",
          content: "The Interhouse iKhwezi Quiz!",
        },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
