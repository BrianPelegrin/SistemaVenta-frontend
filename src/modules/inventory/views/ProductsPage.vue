<template>
  <v-card>
    <v-toolbar title="Productos" class="bg-primary">
      <v-btn icon="mdi mdi-reload" class="mx-2" />
      <v-btn
        text="Registrar Producto"
        append-icon="mdi mdi-plus"
        class="bg-success"
      />
    </v-toolbar>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
</script>

<style scoped></style>
