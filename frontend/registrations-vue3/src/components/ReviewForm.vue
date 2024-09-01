<template>
  <FormDynamic
    title="Revise suas informações"
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
import { useStore } from '@/stores/storeName'

const router = useRouter()
const form = useStore()

const fields = ['email', 'name', 'cpfOrCnpj', 'dataInit', 'phone', 'password']

function handleSubmit() {
  console.log('finalizou')
  const submitForm = async () => {
    try {
      const response = await form.submitRegistration()
      alert(response.message)
    } catch (error) {
      alert('Erro ao enviar o formulário: ' + error.response.data.error)
    }
  }
  //   router.push({ name: 'review' })
  submitForm()
}

function handlePreviousStep() {
  router.push({ name: 'config-passoword' })
}

const errors = reactive({})

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors)
}
</script>
