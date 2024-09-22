<template>
  <v-container>
    <v-card>
      <v-toolbar title="Productos" class="bg-primary">
        <v-btn
          :loading="productService.requestData.isLoading"
          @click="async () => await productService.getList()"
          icon="mdi mdi-reload"
          class="mx-2"
        />
        <v-btn
          :to="{ name: 'products-form-add' }"
          text="Registrar Producto"
          append-icon="mdi mdi-plus"
          class="bg-success"
        />
      </v-toolbar>
      <v-data-table
        :loading="productService.requestData.isLoading"
        :headers="tableHeaders"
        :items="productList"
      >
        <template v-slot:item.stateId="{ item }">
          <v-chip
            :color="item.isActive ? 'success' : 'red'"
            variant="outlined"
            :text="item.isActive ? 'Activo' : 'Inactivo'"
          />
        </template>
        <template v-slot:item.id="{ item }">
          <v-btn
            @click="
              $router.push({
                name: 'products-form-edit',
                params: { id: item.id },
              })
            "
            class="bg-primary"
            icon="mdi mdi-pencil"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { IProduct } from "@/modules/inventory/interfaces";
import { useRequestService } from "@/composables";
const productService = useRequestService<IProduct>("/api/inventory/products");
const productList = computed<IProduct[]>(()=>productService.requestData.list);
const tableHeaders: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Categoria", align: "start", key: "category.name" },
  { title: "Precio de Venta", align: "start", key: "salePrice" },
  { title: "Precio de Compra", align: "start", key: "purchasePrice" },
  { title: "Cantidad Disponible", align: "start", key: "stock" },
  { title: "Acciones", align: "start", key: "id" },
];

onMounted(async () => {
   await productService.getList();
});
</script>

<style scoped></style>
