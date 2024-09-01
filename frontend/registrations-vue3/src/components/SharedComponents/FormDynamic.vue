<template>
  <BaseForm
    :title="title"
    :validationSchema="validationSchema"
    :fields="fields"
    @submit="handleNextStep"
    @validationFailed="handleValidationFailed"
    @back="handlePreviousStep"
    :showButtons="showButtons"
  >
    <div v-for="field in fields" :key="field">
      <BaseInput
        v-model="store.inputValues[field]"
        :label="getLabel(field)"
        :id="field"
        :type="getInputType(field)"
        :placeholder="getPlaceholder(field)"
        :mask="getMask(field)"
        :errorMessage="errors[field]"
        :validateField="validateField"
        :options="getOption(field)"
      />
    </div>
  </BaseForm>
</template>

<script setup>
import { computed, reactive } from 'vue'
import BaseInput from '@/components/SharedComponents/BaseInput.vue'
import BaseForm from '@/components/SharedComponents/BaseForm.vue'
import { useStore } from '@/stores/storeName'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const errors = reactive({})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  validationSchema: {
    type: Object,
    required: true
  },
  showButtons: {
    type: Boolean,
    default: true
  },
  nextStep: {
    type: String,
    default: ''
  },
  previousStep: {
    type: String,
    default: ''
  }
})

function getLabel(field) {
  const labels = {
    name: isPersonCompany.value ? 'Razão social' : 'Nome',
    email: 'Endereço de e-mail',
    password: 'Sua senha',
    cpfOrCnpj: isPersonCompany.value ? ' CNPJ' : 'CPF',
    dataInit: isPersonCompany.value ? 'Data de abertura' : 'Data de nascimento',
    phone: 'Telefone'
  }
  return labels[field]
}

const isPersonCompany = computed(() => {
  return store.inputValues.personType === 'company'
})

function getInputType(field) {
  const types = {
    password: 'password',
    email: 'email',
    dataInit: 'date',
    personType: 'radio'
  }
  return types[field] || 'text'
}

function getPlaceholder(field) {
  const placeholders = {
    email: 'email@brasil.com',
    phone: '(00) 00000-0000'
  }
  return placeholders[field] || ''
}

function getMask(field) {
  if (field === 'cpfOrCnpj') {
    return store.inputValues[field] && store.inputValues.personType === 'company'
      ? '##.###.###/####-##'
      : '###.###.###-##'
  }
  if (field === 'phone') {
    return '(##) #####-####'
  }
  return null
}

function getOption(field) {
  if (field === 'personType') {
    return [
      { value: 'person', label: 'Pessoa Física' },
      { value: 'company', label: 'Pessoa Jurídica' }
    ]
  }
  return []
}

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors)
}

function handleNextStep() {
  router.push({ name: props.nextStep })
}

function handlePreviousStep() {
  router.push({ name: props.previousStep })
}

function validateField(field, value) {
  //   if (field === 'cpfOrCnpj') {
  //     const personType = store.inputValues.personType
  //     console.log('entrou', personType)
  //     return props.validationSchema[field].validate(value, {
  //       context: { personType }
  //     })
  //   }
  return props.validationSchema[field].validate(value)
}
</script>
