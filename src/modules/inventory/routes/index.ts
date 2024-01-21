import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "categories",
    name: "categories-page",
    component: () => import("@/modules/inventory/views/CategoriesPage.vue"),
  },
  {
    path: "categories/form",
    name: "categories-form-add",
    component: () => import("@/modules/inventory/views/CategoriesFormPage.vue"),
  },
  {
    path: "categories/form/:id",
    name: "categories-form-edit",
    component: () => import("@/modules/inventory/views/CategoriesFormPage.vue"),
  },
] as RouteRecordRaw[];
