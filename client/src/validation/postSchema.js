import * as yup from 'yup';

const postSchema = yup.object().shape({
    text: yup.string().required('Texto é necessário').max(100, 'Max: 100 caracteres')
});

export default postSchema

