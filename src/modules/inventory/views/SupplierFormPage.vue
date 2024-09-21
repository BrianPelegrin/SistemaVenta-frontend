<template>
  <v-container>
    <SupplierForm
      @on-submit="async () => await saveSupplier()"
      @on-cancel="$router.push({ name: 'suppliers-page' })"
      :is-loading="supplierService.requestData.isLoading"
      v-model="supplierForm"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import SupplierForm from "@/modules/inventory/components/forms/SupplierForm.vue";
import { ISupplier } from "@/modules/inventory/interfaces";
import { useRequestService } from "@/composables";

const route = useRoute();
const supplierService = useRequestService<ISupplier>("/api/inventory/suppliers");
const supplierId = computed<number | undefined>(() =>
  parseInt(route.params.id as string)
);
const supplierForm = reactive<ISupplier>({
  id: 0,
  name: "",
  stateId: 1,
  email: "",
  phoneNumber: "",
  isActive: true,
});

const saveSupplier = async () => await supplierService.saveRecord(supplierForm);

onMounted(() => {
  if (!supplierId.value) return;

  return supplierService.getById(supplierId.value)
        .then(sup=>{
          Object.assign(supplierForm, sup)
        });

});
</script>

<style scoped></style>
