import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import inventoryModules from "@/modules/inventory/routes";
const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("@/App.vue"),
    children: [
      {
        path: "/inventory",
        name: "inventory",
        component: () => import("@/layouts/MainLayout.vue"),
        children: inventoryModules,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
