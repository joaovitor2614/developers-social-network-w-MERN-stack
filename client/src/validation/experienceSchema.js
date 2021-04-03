import * as yup from 'yup';

const experienceSchema = yup.object().shape({
   
    title: yup.string().required('O título é obrigatório').max(30, 'Máx: 30 caracteres'),
    company: yup.string().required('A empresa é obrigatória').max(30, 'Máx: 30 caracteres'),
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

export default experienceSchema

/*
  to: yup.date('')
    .when('current', {
        is: false,
        then: yup.test('from-to-test', 'Data de início deve ser anterior a de término', 
        function(value) {
            return this.parent.from < value;
        })
    })
    */

