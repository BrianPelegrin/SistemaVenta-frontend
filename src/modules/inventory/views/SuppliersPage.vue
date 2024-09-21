<template>
  <v-container>
    <v-card>
      <v-toolbar title="Proveedores" class="bg-primary">
        <v-btn
          @click="async () => await supplierService.getList()"
          :loading="supplierService.requestData.isLoading"
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
          :disabled="supplierService.requestData.isLoading"
          class="bg-success"
          append-icon="mdi mdi-plus"
          text="Registrar Proveedor"
        />
      </v-toolbar>
      <v-data-table
        :loading="supplierService.requestData.isLoading"
        :items="suppliersList"
        :headers="tableHeaders"
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
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRequestService } from "@/composables";
import { ISupplier } from "@/modules/inventory/interfaces";
const supplierService = useRequestService<ISupplier>("/api/inventory/suppliers");
const suppliersList = computed<ISupplier[]>(() => supplierService.requestData.list);
const tableHeaders: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Telefono", align: "start", key: "phoneNumber" },
  { title: "Correo", align: "start", key: "email" },
  { title: "Estado", align: "start", key: "stateId" },
  { title: "Acciones", align: "start", key: "id" },
];
onMounted(async () => {
  await supplierService.getList();
});
</script>

<style scoped></style>
