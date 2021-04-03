
import * as yup from 'yup';

const profileSchema = yup.object().shape({
   
    status: yup.string().required('Status é obrigatório'),
    skills: yup.string().required('Habilidades são necessárias'),
    company: yup.string(),
    location: yup.string(),
    githubusername: yup.string(),
    bio: yup.string().max(160, 'O máximo é 80 caracteres'),
    website: yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
    youtube:
    yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
    facebook:
    yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
    twitter:
    yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
    instagram:
    yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
    linkedin:
    yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Insira uma url inválida'
    ),
});

export default profileSchema

