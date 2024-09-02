<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    v-if="visible"
  >
    <div class="flex flex-col items-center">
      <img src="@/assets/loader.svg" alt="iconConfirm" />
      <p class="mt-4 text-white text-lg">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "Salvando...",
  },
});
</script>
