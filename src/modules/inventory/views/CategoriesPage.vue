<template>
  <v-card class="mt-3">
    <v-toolbar title="Categorias" class="bg-primary">
      <v-btn
        :loading="categoryStore.isLoading"
        @click="async () => await categoryStore.getCategories()"
        icon="mdi mdi-reload"
        variant="tonal"
        class="mx-2"
      />
      <v-btn
        @click="isModalOpen = true"
        :disabled="categoryStore.isLoading"
        elevated
        class="bg-success"
        append-icon="mdi mdi-plus"
      >
        Registrar Categoria
      </v-btn>
    </v-toolbar>
    <v-data-table
      :loading="categoryStore.isLoading"
      :headers="headers"
      :items="categoriesList"
      :border="true"
    >
      <template v-slot:item.id="{ item }">
        <v-btn
          class="bg-primary"
          icon="mdi mdi-pencil"
          @click="editCategory(item)"
        />
      </template>
      <template v-slot:item.stateId="{ item }">
        <v-switch v-model="item.isActive" color="success" hide-details />
      </template>
    </v-data-table>
  </v-card>
  <v-dialog width="1024" v-model="isModalOpen">
    <CategoryForm
      @on-submit="saveCategory"
      @on-cancel="closeModal"
      v-model:name="currentCategory.name"
      v-model:state-id="currentCategory.stateId"
      :loading="categoryStore.isLoading"
      :id="currentCategory.id"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCategoryStore } from "@/modules/inventory/stores";
import CategoryForm from "@/modules/inventory/components/forms/CategoryForm.vue";
import { ICategory } from "../interfaces";
const isModalOpen = ref<boolean>(false);
const categoryStore = useCategoryStore();
const categoriesList = computed<ICategory[]>(() => categoryStore.categories);
const headers: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Estado", align: "start", key: "stateId" },
  { title: "Acciones", align: "start", key: "id" },
];
const currentCategory = ref<ICategory>({
  id: 0,
  name: "",
  stateId: 1,
});

const closeModal = () => {
  isModalOpen.value = false;
  currentCategory.value = {
    id: 0,
    name: "",
    stateId: 1,
  };
};

const editCategory = (category: ICategory) => {
  console.log(category);

  isModalOpen.value = true;
  Object.entries(category).forEach(
    ([key, val]) => ((currentCategory.value as any)[key] = val)
  );
};
const saveCategory = async () => {
  if (currentCategory.value.id != 0) {
    await categoryStore.updateCategory(currentCategory.value);
  } else {
    await categoryStore.postCategory(currentCategory.value);
  }
  await categoryStore.getCategories();
  closeModal();
};

onMounted(async () => {
  await categoryStore.getCategories();
});
</script>

<style scoped></style>
