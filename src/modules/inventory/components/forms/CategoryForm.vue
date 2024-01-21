<template>
  <v-card>
    <v-toolbar class="bg-primary" title="Formulario de Categorias"> </v-toolbar>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <v-text-field
              @update:model-value="(event) => $emit('update:name', event)"
              :model-value="name"
              :loading="loading"
              :disabled="disabled || loading"
              autofocus
              hide-details
              required
              label="Nombre de la categoria"
            />
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <v-select
              @update:model-value="(value) => $emit('update:stateId', value)"
              :model-value="stateId"
              :loading="loading"
              :disabled="disabled || loading"
              :items="stateList"
              label="Estado de la categoria"
              hide-details
              item-title="name"
              item-value="id"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="bg-default">
        <v-btn @click="$emit('on-cancel')" text="Cancelar" variant="tonal" />
        <v-btn
          @click="$emit('on-submit', category)"
          :loading="loading"
          :disabled="disabled || loading"
          :text="id == 0 ? 'Guardar' : 'Actualizar'"
          class="bg-primary"
        />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ICategory, IState } from "@/modules/inventory/interfaces/index";
interface IProps {
  category?: ICategory;
  disabled?: boolean;
  loading?: boolean;
  name: string;
  stateId: number;
  id?: number;
}
interface IEmits {
  (event: "update:name", args: string): void;
  (event: "update:stateId", args: number): void;
  (event: "on-submit", args?: ICategory): void;
  (event: "on-cancel"): void;
}
defineEmits<IEmits>();
defineProps<IProps>();

const stateList = ref<IState[]>([
  {
    id: 1,
    name: "Activo",
  },
  {
    id: 2,
    name: "Inactivo",
  },
]);

// onMounted(async () => {
//   const {} = await sistemApi.get<IApiResponse<IState[]>>("/states");
// });
</script>

<style scoped></style>
