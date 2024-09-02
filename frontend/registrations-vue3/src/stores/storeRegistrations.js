import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStore = defineStore('storeRegistrations', {
  state: () => ({
    inputValues: {
      email: '',
      personType: '',
      name: '',
      cpfOrCnpj: '',
      dataInit: '',
      phone: ''
    }
  }),
  actions: {
    setInputValue(id, value) {
      if (typeof id === 'object') {
        Object.keys(id).forEach(key => {
          this.inputValues[key] = id[key];
        });
      } 
      this.inputValues[id] = value
    },
    initializeFields(fields) {
      fields.forEach((field) => {
        if (!(field in this.inputValues)) {
          this.inputValues[field] = ''
        }
      })
    },
    async submitRegistration() {
      try {
        const response = await axios.post(`${API_BASE_URL}/registration`, this.inputValues);
        return response.data
      } catch (error) {
        console.error('Erro ao enviar o registro:', error);
        throw error
      }
    }
  }
})
