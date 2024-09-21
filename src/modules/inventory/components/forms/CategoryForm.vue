<template>
  <v-card>
    <v-toolbar class="bg-primary" title="Formulario de Categorias"> </v-toolbar>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <v-text-field
              v-model="modelValue.name"
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
              v-model="modelValue.stateId"
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
          @click="$emit('on-submit', modelValue)"
          :loading="loading"
          :disabled="disabled || loading"
          :text="modelValue.id == 0 ? 'Guardar' : 'Actualizar'"
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
  modelValue: ICategory;  
  disabled?: boolean;
  loading?: boolean;
}
interface IEmits {
  (event: "update:modelValue", args: string): void;
  (event: "on-submit", args?: ICategory): void;
  (event: "on-cancel"): void;
}
defineEmits<IEmits>();
defineProps<IProps>();

const stateList = ref<IState[]>([
  {
    id: 1,
    name: "Activo",
    stateId: 1,
  },
  {
    id: 2,
    name: "Inactivo",
    stateId: 1,
  },
]);

// onMounted(async () => {
//   const {} = await sistemApi.get<IApiResponse<IState[]>>("/states");
// });
</script>

<style scoped></style>
