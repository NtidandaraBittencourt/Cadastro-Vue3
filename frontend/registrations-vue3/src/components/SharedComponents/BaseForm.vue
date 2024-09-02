<template>
  <div class="flex flex-col gap-4">
    <BaseTitle :title="title" />
    <form @submit.prevent="handleSubmit">
      <slot></slot>
      <div class="flex justify-between gap-4">
        <BaseButton v-if="showButtons" @click="previousStep" variant="secondary" class="w-full">
          Voltar
        </BaseButton>
        <BaseButton type="submit" variant="primary" class="w-full"> Continuar </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from '@/stores/storeRegistrations'
import BaseTitle from './BaseTitle.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  title: String,
  validationSchema: Object,
  showButtons: {
    type: Boolean,
    default: true
  },
  fields: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['submit', 'back', 'validationFailed'])

const store = useStore()

store.initializeFields(props.fields)

const errors = reactive(
  props.fields.reduce((acc, field) => {
    acc[field] = ''
    return acc
  }, {})
)

const isSubmitDisabled = computed(() => {
  return (
    Object.values(errors).some((error) => error) ||
    props.fields.some((field) => !store.inputValues[field])
  )
})

async function validateField(field, value) {
  try {
    if (props.validationSchema[field]) {
      if (field === 'cpfOrCnpj') {
        const personType = store.inputValues.personType
        await props.validationSchema[field].validate(value, {
          context: { personType }
        })
      } else {
        await props.validationSchema[field].validate(value)
      }
      errors[field] = ''
    } 
  } catch (err) {
    errors[field] = err.message
  }
}

async function handleSubmit() {
  try {
    for (const field of props.fields) {
      await validateField(field, store.inputValues[field])
    }

    if (!isSubmitDisabled.value) {
      emit('submit')
    } else {
      emit('validationFailed', errors)
    }
  } catch (err) {
    console.error('Erro durante o envio do formulário:', err)
  }
}

function previousStep() {
  emit('back')
}
</script>
