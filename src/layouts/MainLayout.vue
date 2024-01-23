<template>
  <v-layout>
    <TheHeader @on-open-drawer="openDrawer = !openDrawer" />
    <v-navigation-drawer v-model="openDrawer" location="left">
      <v-list>
        <div v-for="appModule in navModules" :key="appModule.path">
          <!-- MODULOS PADRES -->
          <v-list-group :value="appModule.label" v-if="appModule.childs">
            <template v-slot:activator="{ props }">
              <v-list-item
                :prepend-icon="appModule.icon"
                :title="appModule.label"
                v-bind="props"
              >
              </v-list-item>
            </template>

            <v-list-item
              v-for="screenModule in appModule.childs"
              :prepend-icon="screenModule.icon"
              :title="screenModule.label"
              :key="screenModule.path"
              link
              :to="screenModule.path"
            ></v-list-item>
          </v-list-group>
          <!-- MODULOS HIJOS -->
          <v-list-item
            v-else
            :prepend-icon="appModule.icon"
            :title="appModule.label"
            :to="appModule.path"
            link
          ></v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import { IModule } from "@/interfaces";

const openDrawer = ref<boolean>(false);
const navModules = ref<IModule[]>([
  {
    label: "Inventario",
    path: "",
    icon: "mdi mdi-cube",
    childs: [
      {
        label: "Productos",
        path: "/inventory/products",
        icon: "mdi mdi-package-variant-closed",
      },
      {
        label: "Proveedores",
        path: "/inventory/suppliers",
        icon: "mdi mdi-truck-cargo-container",
      },
      {
        label: "Categorias",
        path: "/inventory/categories",
        icon: "mdi mdi-format-list-bulleted",
      },
      {
        label: "Movimientos",
        path: "/inventory/movements",
        icon: "mdi mdi-store-search-outline",
      },
    ],
  },
  {
    label: "Facturas",
    path: "invoices",
    icon: "mdi mdi-invoice",
  },
]);
</script>

<style scoped></style>
