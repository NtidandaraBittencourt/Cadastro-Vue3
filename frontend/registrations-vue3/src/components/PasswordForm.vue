<template>
  <FormDynamic
    title="Senha de acesso"
    :fields="fields"
    :validationSchema="validationSchema"
    @submit="handleSubmit"
    @validationFailed="handleValidationFailed"
    @back="handlePreviousStep"
  />
</template>

<script setup>
import FormDynamic from '@/components/SharedComponents/FormDynamic.vue'
import { validationSchema } from '@/utils/validationSchema'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()

const fields = ['password']

function handleSubmit() {
  router.push({ name: 'review' })
}

function handlePreviousStep() {
  router.push({ name: 'person' })
}

const errors = reactive({})

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors)
}
</script>
