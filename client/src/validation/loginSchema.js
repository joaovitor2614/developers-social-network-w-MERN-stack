import * as yup from 'yup';

const loginSchema = yup.object().shape({
   
    email: yup.string().email('Formato inválido').required('Email é necessário'),
    password: yup.string().required('Senha é necessário').min(6, 'A senha deve ter no minímo 6 caracteres')
});

export default loginSchema

