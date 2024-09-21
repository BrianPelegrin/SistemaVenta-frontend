<template>
  <v-container>
    <v-card class="mt-3">
      <v-toolbar title="Categorias" class="bg-primary">
        <v-btn
          :loading="categoryServices.requestData.isLoading"
          @click="async () => await categoryServices.getList()"
          icon="mdi mdi-reload"
          variant="tonal"
          class="mx-2"
        />
        <v-btn
          @click="isModalOpen = true"
          :disabled="categoryServices.requestData.isLoading"
          elevated
          class="bg-success"
          append-icon="mdi mdi-plus"
        >
          Registrar Categoria
        </v-btn>
      </v-toolbar>
      <v-data-table
        :loading="categoryServices.requestData.isLoading"
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
          <v-chip
            :color="item.isActive ? 'success' : 'red'"
            variant="outlined"
            :text="item.isActive ? 'Activo' : 'Inactivo'"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog width="1024" v-model="isModalOpen">
    <CategoryForm
      @on-submit="saveCategory"
      @on-cancel="closeModal"
      v-model="currentCategory"
      :loading="categoryServices.requestData.isLoading"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import { useRequestService } from "@/composables"
import CategoryForm from "@/modules/inventory/components/forms/CategoryForm.vue";
import { ICategory } from "../interfaces";
const isModalOpen = ref<boolean>(false);
const categoryServices = useRequestService<ICategory>("/api/inventory/categories");
const categoriesList = computed<ICategory[]>(() => categoryServices.requestData.list);
const headers: any[] = [
  { title: "Nombre", align: "start", key: "name" },
  { title: "Estado", align: "start", key: "stateId" },
  { title: "Acciones", align: "start", key: "id" },
];
const currentCategory = reactive<ICategory>({
  id: 0,
  name: "",
  stateId: 1,
});

const closeModal = () => {
  isModalOpen.value = false;
  currentCategory.id =  0
  currentCategory.name = ""
  currentCategory.stateId =  1
};

const editCategory = (category: ICategory) => {
  console.log(category);

  isModalOpen.value = true;
  Object.assign(currentCategory, {...category})
};
const saveCategory = async () => {
  await categoryServices.saveRecord(currentCategory);
  await categoryServices.getList();
  closeModal();
};

onMounted(async () => {
  await categoryServices.getList();
});
</script>

<style scoped></style>
