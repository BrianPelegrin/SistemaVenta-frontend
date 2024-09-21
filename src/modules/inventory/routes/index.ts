import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "categories",
    name: "categories-page",
    component: () => import("@/modules/inventory/views/CategoriesPage.vue"),
  },
  {
    path: "suppliers",
    name: "suppliers-page",
    component: () => import("@/modules/inventory/views/SuppliersPage.vue"),
  },
  {
    path: "suppliers-form",
    name: "suppliers-form-add",
    component: () => import("@/modules/inventory/views/SupplierFormPage.vue"),
  },
  {
    path: "suppliers-form/:id",
    name: "suppliers-form-edit",
    component: () => import("@/modules/inventory/views/SupplierFormPage.vue"),
  },
  {
    path: "products",
    name: "products-page",
    component: () => import("@/modules/inventory/views/ProductsPage.vue"),
  },
  {
    path: "products-form",
    name: "products-form-add",
    component: () => import("@/modules/inventory/views/ProductFormPage.vue"),
  },
  {
    path: "products-form/:id",
    name: "products-form-edit",
    component: () => import("@/modules/inventory/views/ProductFormPage.vue"),
  },
  {
    path: "lots",
    name: "lots-page",
    component: () => import("@/modules/inventory/views/LotsPage.vue"),
  },
  {
    path: "lots-form",
    name: "lots-form-add",
    component: () => import("@/modules/inventory/views/LotsFormPage.vue"),
  },
  {
    path: "lots-form/:id",
    name: "lots-form-edit",
    component: () => import("@/modules/inventory/views/LotsFormPage.vue"),
  },
] as RouteRecordRaw[];
