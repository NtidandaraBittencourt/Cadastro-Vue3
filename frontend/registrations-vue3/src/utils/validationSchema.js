import * as yup from 'yup'

export const validationSchema = {
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  name: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpfOrCnpj: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  dataInit: yup
    .date()
    .required('a data é obrigatória')
    .typeError('Data inválida. Por favor, insira uma data válida.')
    .min(new Date(1900, 0, 1), 'A data deve ser posterior a 01/01/1900.')
    .max(new Date(2040, 11, 31), 'A data não pode ser superior a 2040.'),
  personType: yup.string().required('Selecione um tipo de cadastro'),
  phone: yup.string().required('Telefone é obrigatório').min(15, 'Preencha o telefone com o DDD')
}

// cpfOrCnpj: yup.string().when('$personType', {
//   is: 'company',
//   then: yup.string().required('CNPJ é obrigatório').length(18, 'Prencha com um CNPJ válido'),
//   otherwise: yup.string().required('CPF é obrigatório').length(14, 'Prencha com um CPF válido')
// }),
