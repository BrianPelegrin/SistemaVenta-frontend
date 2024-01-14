<template>
  <header>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="$emit('on-open-drawer')"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>SISTEMA DE VENTAS</v-toolbar-title>
    </v-app-bar>
  </header>
</template>

<script setup lang="ts">
interface IEmits {
  (event: "on-open-drawer"): void;
}

defineEmits<IEmits>();
</script>

<style scoped></style>
