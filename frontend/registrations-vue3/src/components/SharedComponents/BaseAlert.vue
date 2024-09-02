<template>
  <div v-if="visible" :class="alertClasses" role="alert">
    <slot />
    <button
      @click="closeAlert"
      class="ml-4 font-semibold text-sm text-white focus:outline-none"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
});

const visible = ref(true);
let timeoutId = null;

const alertClasses = computed(() => {
  const baseClasses =
    "m-4 fixed bottom-0 left-0 right-0 z-50 w-1/2 flex justify-self-end p-4 rounded-md justify-between";

  switch (props.type) {
    case "success":
      return `${baseClasses} bg-green-500 text-white`;
    case "warning":
      return `${baseClasses} bg-yellow-500 text-black`;
    case "danger":
      return `${baseClasses} bg-red-500 text-white`;
    default:
      return `${baseClasses} bg-blue-500 text-white`;
  }
});

function closeAlert() {
  visible.value = false;
}

onMounted(() => {
  timeoutId = setTimeout(() => {
    closeAlert();
  }, 3000);
});

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>
