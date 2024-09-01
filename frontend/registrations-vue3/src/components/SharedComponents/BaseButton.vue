<template>
  <button :type="type" :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  class: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = 'px-4 py-2 rounded text-white'
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600',
    secondary:
      'bg-transparent text-pink-500 border border-orange-500 hover:bg-orange-500 hover:text-white'
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${props.class}`
})

function handleClick(event) {
  emit('click', event)
}
</script>

<style scoped></style>
