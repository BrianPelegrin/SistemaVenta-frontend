<template>
  <fieldset
    class="the-fieldset"
    :class="[`${isHovered ? 'is-fielset-focus' : ''}`]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <legend class="the-legend" :class="legendClass">
      {{ title }}
    </legend>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface IProps {
  title: string;
  legendClass?: string;
}
const isHovered = ref<boolean>(false);

defineProps<IProps>();
</script>

<style scoped>
.the-legend {
  opacity: 0.6;
  font-size: 1.25rem;
  margin-left: 15px;
  transition: 0.5s;
}

.is-fielset-focus > .the-legend {
  opacity: 1;
}
.is-fielset-focus {
  border: 2px solid #000;
}
.the-fieldset {
  border-radius: 5px;
  transition: 0.5s;
}
</style>
