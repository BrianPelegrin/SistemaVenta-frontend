import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/categories",
        name: "categories-page",
        component: () => import("@/modules/inventory/views/CategoriesPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
