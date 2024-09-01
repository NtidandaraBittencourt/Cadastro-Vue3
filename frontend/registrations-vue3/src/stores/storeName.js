import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('storeName', {
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
      const response = await axios.post('http://localhost:3000/registration', this.inputValues)
      return response.data
    }
  }
})
