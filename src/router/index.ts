import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    name: "menu",
    path: "/",
    component: () => import("/@/views/menu/index.vue")
  }
];

export default createRouter({
  routes,
  history: createWebHistory()
});
