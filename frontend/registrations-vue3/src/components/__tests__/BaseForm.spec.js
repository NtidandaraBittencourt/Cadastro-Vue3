import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseForm from '@/components/SharedComponents/BaseForm.vue'
import BaseInput from '@/components/SharedComponents/BaseInput.vue'
import { createStore } from 'vuex'
import { useStore } from '@/stores/storeName'
import { reactive } from 'vue'

const store = createStore({
  state() {
    return {
      inputValues: {
        email: '',
        personType: '',
        name: '',
        cpfOrCnpj: '',
        dataInit: '',
        phone: ''
      }
    }
  },
  actions: {
    updateInputValue: vi.fn()
  }
})

const validationSchema = {
  email: {
    validate: vi.fn().mockResolvedValueOnce(),
  },
  personType: {
    validate: vi.fn().mockResolvedValueOnce(),
  }
  : {
    validate: vi.fn().mockResolvedValueOnce(),
  }
}

describe('BaseForm.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseForm, {
      props: {
        title: 'Seja bem vindo(a)',
        validationSchema,
        fields: ['email', 'personType']
      },
      global: {
        plugins: [store]
      },
      slots: {
        default: '<BaseInput id="email" type="email" v-model="inputValues.email" />'
      }
    })

    expect(wrapper.text()).toContain('Seja bem vindo(a)')
  })

  it('calls handleSubmit on form submit', async () => {
    const wrapper = mount(BaseForm, {
      props: {
        title: 'Seja bem vindo(a)',
        validationSchema,
        fields: ['email', 'personType']
      },
      global: {
        plugins: [store]
      }
    })

    const handleSubmit = vi.fn()
    wrapper.vm.handleSubmit = handleSubmit

    await wrapper.find('form').trigger('submit.prevent')

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('shows validation errors', async () => {
    // Mock dos erros de validação
    validationSchema.email.validate.mockRejectedValueOnce(new Error('E-mail é obrigatório'))
    
    const wrapper = mount(BaseForm, {
      props: {
        title: 'Seja bem vindo(a)',
        validationSchema,
        fields: ['email', 'personType']
      },
      global: {
        plugins: [store]
      }
    })

    // Set input values to trigger validation
    await wrapper.setData({ inputValues: { email: '', personType: '' } })

    // Simula o envio do formulário
    await wrapper.find('form').trigger('submit.prevent')

    // Verifica se os erros são exibidos
    expect(wrapper.text()).toContain('E-mail é obrigatório')
  })
})
