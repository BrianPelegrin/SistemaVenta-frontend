<template>
  <v-container>
    <SupplierForm
      @on-submit="async () => await saveSupplier()"
      @on-cancel="$router.push({ name: 'suppliers-page' })"
      :is-loading="supplierStore.isLoading"
      :id="currentSupplier.id"
      v-model:name="currentSupplier.name"
      v-model:email="currentSupplier.email"
      v-model:phone-number="currentSupplier.phoneNumber"
      v-model:state-id="currentSupplier.stateId"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SupplierForm from "@/modules/inventory/components/forms/SupplierForm.vue";
import { ISupplier } from "@/modules/inventory/interfaces";
import { useSupplierStore } from "@/modules/inventory/stores";

const supplierStore = useSupplierStore();
const route = useRoute();
const currentSupplier = ref<ISupplier>({
  id: 0,
  name: "",
  stateId: 1,
  email: "",
  phoneNumber: "",
});
const supplierId = computed<number | undefined>(() =>
  parseInt(route.params.id as string)
);

const onMountedInEdit = async () => {
  if (!supplierId.value) return;

  await supplierStore.getSupplier(supplierId.value);

  if (!supplierStore.supplier) return;

  Object.entries(supplierStore.supplier).forEach(([key, val]) => {
    (currentSupplier.value as any)[key] = val as any;
  });
};

const saveSupplier = async () => {
  if (currentSupplier.value.id) {
    await supplierStore.updateSupplier(currentSupplier.value);
  } else {
    await supplierStore.postSupplier(currentSupplier.value);
  }
};

onMounted(async () => {
  await onMountedInEdit();
});
</script>

<style scoped></style>
