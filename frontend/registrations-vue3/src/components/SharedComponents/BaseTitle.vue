<template>
  <span class="text-xl font-bold mb-2">{{ title }}</span>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
