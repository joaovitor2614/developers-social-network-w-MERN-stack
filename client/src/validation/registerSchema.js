import * as yup from 'yup';

const registerSchema = yup.object().shape({
    name: yup.string().required('Nome é necessário').min(2, 'Nome tem que ter no miníno 2 caracteres'),
    email: yup.string().email('Formato inválido').required('Email é necessário'),
    password: yup.string().required('Senha é necessário').min(6, 'A senha deve ter no minímo 6 caracteres'),
    password2: yup.string().test('password-match', 'Senhas devem ser iguais', function(value) {
        return this.parent.password === value;
    })
});

export default registerSchema

