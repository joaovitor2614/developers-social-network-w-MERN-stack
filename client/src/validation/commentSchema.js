import * as yup from 'yup';

const commentSchema = yup.object().shape({
    text: yup.string().required('Texto é necessário').max(40, 'Max: 100 caracteres')
});

export default commentSchema

