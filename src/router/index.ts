import { isNil } from "lodash-unified";
import { createRouter, createWebHashHistory } from "vue-router";
import type { Route, RouteNormalized } from "/#/vue-route";
const routes: Route[] = [
  {
    name: "menu",
    path: "/",
    component: () => import("/@/views/menu/index.vue")
  },
  {
    name: "calculator",
    path: "/calculator",
    component: () => import("/@/views/calculator/index.vue"),
    meta: {
      hoverColor: "#00ade1",
      showName: "Calculator"
    }
  }
];
const router = createRouter({
  routes,
  history: createWebHashHistory("/small-case/dist/"),
  strict: true,
  scrollBehavior(to, from: RouteNormalized, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        resolve(savedPosition);
      }
    });
  }
});
router.beforeEach((to: RouteNormalized, from, next) => {
  document.title = isNil(to.meta?.showName) ? "Some cases" : to.meta.showName;
  next();
});
export default router;
