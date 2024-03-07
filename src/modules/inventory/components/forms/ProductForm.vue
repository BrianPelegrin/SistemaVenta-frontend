<template>
  <div class="pa-5">
    <v-toolbar
      class="bg-primary mb-4 rounded"
      title="Formulario de Productos"
    />

    <v-row>
      <v-col cols="12" md="8" sm="12" lg="8">
        <TheFieldset title="Informacion del Producto">
          <v-container>
            <v-row>
              <v-col cols="12" md="8" lg="8" sm="12">
                <v-text-field
                  label="Nombre del Producto"
                  placeholder="Digite el nombre del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4" lg="4" sm="12">
                <v-select
                  :items="categoryList"
                  item-title="name"
                  item-value="id"
                  label="Categoria del Producto"
                  placeholder="Seleccione la categoria del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="12" lg="12" sm="12">
                <v-text-field
                  label="Codigo de barra del Producto"
                  placeholder="Digite el codigo de barra del producto..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-text-field
                  label="Cantidad en almacen"
                  placeholder="Digite la cantidad en almacen..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-text-field
                  label="Cantidad minima en almacen"
                  placeholder="Digite la cantidad minima en almacen..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-select
                  :items="categoryList"
                  item-title="name"
                  item-value="id"
                  label="Unidad de Medida"
                  placeholder="Seleccione la unidad de medida..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="12" lg="12" sm="12">
                <v-textarea
                  label="Descripcion del Producto"
                  placeholder="Digite la descripcion del producto..."
                  hide-details
                  variant="outlined"
                  rows="7"
                />
              </v-col>
            </v-row>
          </v-container>
        </TheFieldset>
      </v-col>
      <v-col cols="12" md="4" sm="12" lg="4">
        <TheFieldset title="Foto del Producto" class="mb-4">
          <!-- <v-toolbar class="bg-primary" title="Foto del Producto" /> -->
          <div class="w-100">
            <div style="font-size: 8rem">
              <v-icon icon="mdi mdi-image" class="w-100" />
            </div>
            <div class="pa-2">
              <v-btn
                text="Subir Foto"
                class="w-100"
                variant="tonal"
                append-icon="mdi mdi-plus"
              />
            </div>
          </div>
        </TheFieldset>
        <TheFieldset title="Informacion de Venta">
          <!-- <v-toolbar class="bg-primary" title="Informacion de Venta" /> -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Precio de Compra"
                  placeholder="Digite el precio de compra..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Precio de Venta"
                  placeholder="Digite el precio de venta..."
                  hide-details
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-container>
        </TheFieldset>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { TheFieldset } from "@/components";
import { useCategoryStore } from "@/modules/inventory/stores";
import { useRequestService } from "@/composables";
import { ICategory } from "@/modules/inventory/interfaces";
const categoryStore = useCategoryStore();
const categoryService = useRequestService<ICategory>("/inventory/categories");
const categories = ref<ICategory[]>([]);
//COMPUTEDS
const categoryList = computed(() => categoryService.requestData.list);

onMounted(async () => {
  categories.value = await categoryService.getList();
});
</script>

<style scoped></style>
