import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BaseForm from '../SharedComponents/BaseForm.vue'
import BaseInput from '../SharedComponents/BaseInput.vue'
import BaseTitle from '../SharedComponents/BaseTitle.vue'
import BaseButton from '../SharedComponents/BaseButton.vue'
import { useStore } from '@/stores/storeRegistrations'
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

  // it('valida os campos ao submeter o formulário', async () => {
  //   const validateSpy = vi.fn(() => Promise.resolve())
  
  //   const wrapper = createComponent({
  //     validationSchema: {
  //       name: { validate: validateSpy },
  //       cpfOrCnpj: { validate: validateSpy },
  //       dataInit: { validate: validateSpy },
  //       phone: { validate: validateSpy }
  //     },
  //   })
  
  //   const submitButton = wrapper.find('button[type="submit"]')
  //   await submitButton.trigger('click')
  
  //   expect(validateSpy).toHaveBeenCalledTimes(4)
  // })

  // it('valida os campos e emite o evento de submit ao submeter o formulário', async () => {
  //   const validateSpy = vi.fn(() => Promise.resolve());

  //   const store = useStore();
  //   store.inputValues = {
  //     name: 'Maria joana',
  //     cpfOrCnpj: '123.456.789-01',
  //     dataInit: '2023-01-01',
  //     phone: '(12) 34567-0890'
  //   };
  //   store.setInputValue = vi.fn();

  //   const wrapper = mount(BaseForm, {
  //     props: {
  //       validationSchema: {
  //         name: { validate: validateSpy },
  //         cpfOrCnpj: { validate: validateSpy },
  //         dataInit: { validate: validateSpy },
  //         phone: { validate: validateSpy }
  //       },
  //       fields: ['name', 'cpfOrCnpj', 'dataInit', 'phone']
  //     },
  //     global: {
  //       mocks: {
  //         $store: store
  //       }
  //     }
  //   });

  //   // Submete o formulário
  //   const submitButton = wrapper.find('button[type="submit"]');
  //   await submitButton.trigger('click');

  //   // Verifica se a validação foi chamada para cada campo
  //   console.log('isSubmitDisabled:', wrapper.vm.isSubmitDisabled);
  //   expect(validateSpy).toHaveBeenCalledTimes(4);

  //   // Verifica se o evento submit foi emitido
  //   console.log('Eventos emitidos:', wrapper.emitted());
  //   expect(wrapper.emitted('submit')).toBeTruthy();
  // });

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


// it('emite o evento validationFailed quando o formulário é inválido', async () => {
//   const wrapper = createComponent({
//     validationSchema: {
//       name: { validate: () => Promise.reject(new Error('Invalid name')) },
//       cpfOrCnpj: { validate: () => Promise.resolve() },
//     },
//   })

//   const validationFailedSpy = vi.fn()
//   wrapper.vm.$on('validationFailed', validationFailedSpy)

//   const submitButton = wrapper.find('button[type="submit"]')
//   await submitButton.trigger('click')

//   expect(validationFailedSpy).toHaveBeenCalledWith({
//     name: 'Invalid name',
//     cpfOrCnpj: '',
//   })
// })

// it('o botão de submit é desabilitado se houver campos vazios ou erros', async () => {
//   const wrapper = createComponent({
//     validationSchema: {
//       name: { validate: () => Promise.reject(new Error('Invalid name')) },
//       cpfOrCnpj: { validate: () => Promise.resolve() },
//     },
//   })

//   await wrapper.setData({
//     errors: {
//       name: 'Invalid name',
//       cpfOrCnpj: '',
//     },
//   })

//   const isDisabled = wrapper.vm.isSubmitDisabled
//   expect(isDisabled).toBe(true)
// })

// it('emite o evento back ao clicar no botão Voltar', async () => {
//   const wrapper = createComponent({
//     showButtons: true,
//   })

//   const backSpy = vi.fn()
//   wrapper.vm.$on('back', backSpy)

//   const backButton = wrapper.findAllComponents(BaseButton).at(0) // "Voltar" button
//   await backButton.trigger('click')

//   expect(backSpy).toHaveBeenCalled()
// })
