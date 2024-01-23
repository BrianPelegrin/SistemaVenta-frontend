<template>
  <v-card>
    <v-toolbar title="Proveedores" class="bg-primary">
      <v-btn
        @click="async () => await supplierStore.getSuppliers()"
        :loading="supplierStore.isLoading"
        class="bg-primary mx-2"
        icon="mdi mdi-reload"
        variant="tonal"
      />
      <v-btn
        @click="
          $router.push({
            name: 'suppliers-form-add',
          })
        "
        :disabled="supplierStore.isLoading"
        class="bg-success"
        append-icon="mdi mdi-plus"
        text="Registrar Proveedor"
      />
    </v-toolbar>
    <v-data-table
      :loading="supplierStore.isLoading"
      :items="suppliersList"
      :headers="tableHeaders"
    >
      <template v-slot:item.stateId="{ item }">
        <v-switch v-model="item.isActive" color="success" hide-details />
      </template>
      <template v-slot:item.id="{ item }">
        <v-btn
          @click="
            $router.push({
              name: 'suppliers-form-edit',
              params: { id: item.id },
            })
          "
          class="bg-primary"
          icon="mdi mdi-pencil"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useSupplierStore } from "@/modules/inventory/stores";
import { ISupplier } from "../interfaces";
const supplierStore = useSupplierStore();
const suppliersList = computed<ISupplier[]>(() => supplierStore.suppliers);
const tableHeaders: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Telefono", align: "start", key: "phoneNumber" },
  { title: "Correo", align: "start", key: "email" },
  { title: "Estado", align: "start", key: "stateId" },
  { title: "Acciones", align: "start", key: "id" },
];
onMounted(async () => {
  await supplierStore.getSuppliers();
});
</script>

<style scoped></style>
