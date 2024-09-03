import {  mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import BaseInput from '../SharedComponents/BaseInput.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('BaseInput', () => {
  const mockValidateField = vi.fn();

  let pinia;

  const mountComponent = (props) => {
    return mount(BaseInput, {
      global: {
        plugins: [pinia],
      },
      props: {
        modelValue: '',
        label: 'Nome',
        id: 'idName',
        validateField: mockValidateField,
        errorMessages: '',
        ...props,
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('Apresenta o componente com base nas props recebidas', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('label').text()).toBe('Nome');
    expect(wrapper.find('input').attributes('type')).toBe('text');
  })

  it('Apresenta os inputs de radio/checkbox corretamente', () => {
    const options = [
      { label: 'person', value: 'Pessoa Fisica' },
      { label: 'company', value: 'Pessoa Juridica' },
    ];
    const wrapper = mountComponent({ type: 'radio', options });
  
    const inputs = wrapper.findAll('input[type="radio"]');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('id')).toBe('idName-Pessoa Fisica');
    expect(inputs[1].attributes('id')).toBe('idName-Pessoa Juridica');
  })

  it('Emits update:modelValue se o valor do input mudar', async () => {
    const wrapper = mountComponent();
  
    const input = wrapper.find('input');
    await input.setValue('New Value');
  
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Value']);
  })

  it('Chama o validade e atualiza a mensagem de erro no blur', async () => {
    mockValidateField.mockRejectedValue(new Error('Nome é obrigátorio'));
    
    const wrapper = mountComponent();
    const input = wrapper.find('input');
  
    await input.trigger('blur');
    expect(mockValidateField).toHaveBeenCalledWith('idName', '');
  
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.text-red-600').text()).toBe('Nome é obrigátorio');
  })
  
  it('Aplica as classes de erro no input', async () => {
    const wrapper = mountComponent({ errorMessage: 'Nome é obrigatório' });

    expect(wrapper.find('input').classes()).toContain('border-red-500');
    expect(wrapper.find('.text-red-600').text()).toBe('Nome é obrigatório');
  })

  it('watch, observa e atualiza os volores do modelValue', async () => {
    const wrapper = mountComponent({ modelValue: 'Nome' });
    await wrapper.setProps({ modelValue: 'updated' });
  
    expect(wrapper.vm.inputValue).toBe('updated');
  })

  it('Watch, observa e atualiza o errorMessage', async () => {
    const wrapper = mountComponent({ errorMessage: '' });
    await wrapper.setProps({ errorMessage: 'Nome é obrigatório' });
  
    expect(wrapper.vm.localErrorMessage).toBe('Nome é obrigatório');
  });
})









