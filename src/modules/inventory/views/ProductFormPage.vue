<template>
  <ProductForm @on-submit="onSave" v-model="product" />
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductForm from "@/modules/inventory/components/forms/ProductForm.vue";
import { IProduct } from "@/modules/inventory/interfaces";
import { useRequestService } from "@/composables";

const route = useRoute();
const productService = useRequestService<IProduct>("/api/inventory/products");

const productId = computed<number>(
  () => parseInt(route.params.id as string) ?? 0
);

const product = reactive<IProduct>({
  id: 0,
  name: "",
  barCode: "",
  description: "",
  stock: null,
  image: "",
  minimalStock: null,
  categoryId: null,
  purchasePrice: null,
  salePrice: null,
  stateId: 1,
  unitMeasurementId: null,
});

const onSave = async () => {
  console.log('Se mando a guardar el producto: ', product)
  await productService.saveRecord(product);
};

onMounted(async () => {
  if (productId.value) {
    const productToEdit = await productService.getById(productId.value);
    if (!productToEdit) return;

    Object.assign(product, productToEdit);
  }
});
</script>

<style scoped></style>
