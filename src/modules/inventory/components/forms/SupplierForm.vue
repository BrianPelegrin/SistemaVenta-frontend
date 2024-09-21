<template>
  <v-card>
    <v-toolbar title="Formulario de Proveedores" class="bg-primary" />
    <v-container>
      <v-row>
        <v-col cols="12" md="6" sm="6" lg="6">
          <v-text-field
            v-model="modelValue.name"
            :loading="isLoading"
            :disabled="isLoading || disabled"
            label="Nombre del proveedor"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" lg="6">
          <v-select
            v-model="modelValue.stateId"
            :items="stateList"
            :loading="isLoading"
            :disabled="isLoading || disabled"
            item-title="name"
            item-value="id"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" lg="6">
          <v-text-field
            v-model="modelValue.email"
            :loading="isLoading"
            :disabled="isLoading || disabled"
            label="Correo Electronico"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" lg="6">
          <v-text-field
            v-model="modelValue.phoneNumber"
            :loading="isLoading"
            :disabled="isLoading || disabled"
            label="Numero de Telefono"
            hide-details
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text="Cancelar" variant="tonal" @click="$emit('on-cancel')" />
      <v-btn
        :loading="isLoading"
        :disabled="isLoading || disabled"
        :text="!modelValue.id ? 'Guardar' : 'Actualizar'"
        class="bg-primary"
        append-icon="mdi mdi-floppy"
        @click="$emit('on-submit')"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IState, ISupplier } from "@/modules/inventory/interfaces/index";
interface IProps {
  isLoading?: boolean;
  disabled?: boolean;
  modelValue:ISupplier
}
interface IEmits {
  (event: "update:modelValue", args?: string): void;
  (event: "on-submit"): void;
  (event: "on-cancel"): void;
}
defineProps<IProps>();
defineEmits<IEmits>();
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
</script>

<style scoped></style>
