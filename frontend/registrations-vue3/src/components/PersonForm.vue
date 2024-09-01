<template>
  <FormDynamic
    :title="getTitle"
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
import { reactive, computed } from 'vue'
import { useStore } from '@/stores/storeName'

const router = useRouter()
const store = useStore()

const fields = ['name', 'cpfOrCnpj', 'dataInit', 'phone']

const isPersonCompany = computed(() => {
  return store.inputValues.personType === 'company'
})

const getTitle = computed(() => {
  return isPersonCompany.value ? 'Pessoa Jurídica' : 'Pessoa Física'
})

function handleSubmit() {
  router.push({ name: 'config-passoword' })
}

function handlePreviousStep() {
  router.push({ name: 'home' })
}

const errors = reactive({})

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors)
}
</script>
