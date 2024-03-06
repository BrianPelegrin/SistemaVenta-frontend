<template>
  <v-container>
    <v-card>
      <v-toolbar title="Productos" class="bg-primary">
        <v-btn
          :loading="isLoading"
          @click="async () => await productStore.getProducts()"
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
        :loading="isLoading"
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
import { ref, onMounted } from "vue";
import { useProductStore } from "@/modules/inventory/stores";
import { IProduct } from "@/modules/inventory/interfaces";
import { ProductService } from "@/modules/inventory/services";
const productStore = useProductStore();
const isLoading = ref<boolean>(false);
const productList = ref<IProduct[]>([]);
const tableHeaders: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Categoria", align: "start", key: "category.name" },
  { title: "Precio de Venta", align: "start", key: "salePrice" },
  { title: "Precio de Compra", align: "start", key: "pucharsePrice" },
  { title: "Cantidad Disponible", align: "start", key: "stock" },
  { title: "Acciones", align: "start", key: "id" },
];

onMounted(async () => {
  isLoading.value = true;
  const data = await ProductService.getProducts();
  if (data) {
    productList.value = data;
  }
  isLoading.value = false;
});
</script>

<style scoped></style>
