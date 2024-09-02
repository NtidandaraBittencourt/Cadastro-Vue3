import * as yup from 'yup'

export const validationSchema = {
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  name: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpfOrCnpj: yup.string().required('CPF ou CNPJ é obrigatório').test('cpfOrCnpj', function(value) {
    const { personType } = this.options.context;
    if (personType === 'company') {
      if (!value || value.length !== 18) {
        return this.createError({ message: 'CNPJ inválido. O CNPJ deve ter 18 caracteres.' });
      }
    } else {
      if (!value || value.length !== 14) {
        return this.createError({ message: 'CPF inválido. O CPF deve ter 14 caracteres.' });
      }
    }
    return true
  }),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  dataInit: yup
    .date()
    .required('a data é obrigatória')
    .typeError('Data inválida. Por favor, insira uma data válida.')
    .min(new Date(1900, 0, 1), 'A data deve ser posterior a 01/01/1900.')
    .max(new Date(2040, 11, 31), 'A data não pode ser superior a 2040.'),
  personType: yup.string().required('Tipo de cadastro é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório').min(15, 'Preencha o telefone com o DDD')
}

