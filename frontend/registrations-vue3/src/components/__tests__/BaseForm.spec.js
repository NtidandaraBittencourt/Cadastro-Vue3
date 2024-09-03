import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BaseForm from '../SharedComponents/BaseForm.vue'
import BaseTitle from '../SharedComponents/BaseTitle.vue'
import BaseButton from '../SharedComponents/BaseButton.vue'
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/stores/storeRegistrations', () => ({
  useStore: vi.fn(() => ({
    inputValues: {},
    initializeFields: vi.fn(),
    setInputValue: vi.fn(),
  })),
}))

describe('BaseForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const createComponent = (propsData) => {
    return mount(BaseForm, {
      props: {
        title: 'Form Title',
        validationSchema: {},
        fields: ['name', 'cpfOrCnpj', 'dataInit', 'phone'],
        ...propsData
      },
      global: {
        components: {
          BaseButton,
          BaseTitle,
        },
      },
    })
  }

  it('renderiza o componente corretamente', () => {
    const wrapper = createComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(BaseTitle).exists()).toBe(true)
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true)
  })

  it('emite o evento validationFailed quando o formulário é inválido', async () => {
    const wrapper = mount(BaseForm, {
      props: {
        validationSchema: {
          name: { validate: () => Promise.reject(new Error('Nome é obrigatório')) },
          cpfOrCnpj: { validate: () => Promise.resolve() },
          dataInit: { validate: () => Promise.resolve() },
          phone: { validate: () => Promise.resolve() },
        },
        fields: ['name', 'cpfOrCnpj', 'dataInit', 'phone']
      },
      global: {
        mocks: {
          $store: {
            inputValues: {
              name: '',
              cpfOrCnpj: '',
              dataInit: '',
              phone: ''
            },
            setInputValue: vi.fn()
          }
        }
      }
    });

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('click');

    const emittedEvents = wrapper.emitted('validationFailed');
    expect(emittedEvents).toBeDefined(); // Verifica se o evento foi emitido
    expect(emittedEvents.length).toBeGreaterThan(0); // Verifica se há chamadas

    const [firstCall] = emittedEvents;
    expect(firstCall[0]).toEqual({
      name: 'Nome é obrigatório',
      cpfOrCnpj: '',
      dataInit: '',
      phone: ''
    });
  });
});
