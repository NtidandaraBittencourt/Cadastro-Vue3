<template>
  <DynamicForm
    title="Seja bem vindo(a)"
    :fields="['email', 'personType']"
    :validationSchema="validationSchema"
    @submit="handleSubmit"
    @validationFailed="handleValidationFailed"
    :showButtons="false"
  />
</template>

<script setup>
import DynamicForm from '@/components/SharedComponents/FormDynamic.vue'
import { validationSchema } from '@/utils/validationSchema'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()

function handleSubmit() {
  router.push({ name: 'person' })
}

const errors = reactive({})

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors)
}
</script>
