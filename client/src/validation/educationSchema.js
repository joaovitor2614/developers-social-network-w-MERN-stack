import * as yup from 'yup';

const educationSchema = yup.object().shape({
   
    school: yup.string().required('A instituição educacional é obrigatório').max(30, 'Máx: 30 caracteres'),
    degree: yup.string().required('O tipo de certificado é obrigatório').max(30, 'Máx: 30 caracteres'),
    fieldofstudy: yup.string().required('O campo de estudo é obrigatório').max(30, 'Máx: 30 caracteres'),
    location: yup.string().max(30, 'Máx: 30 caracteres'),
    description: yup.string().max(60, 'Máx: 60 caracteres'),
    current: yup.boolean(),
    from: yup.date('').required('Data de início é obrigatória'),
    to: yup.date('')
    .when('current', {
        is: false,
        then: yup.date().test('from-to-test', 'Data de início deve ser anterior a de término', 
        function(value) {
            return this.parent.from < value;
        })
    })
    
   
    
});

export default educationSchema
