const express = require('express')
const config = require('config');
const axios = require('axios');
const normalize = require('normalize-url')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middlewares/auth')
const router = express.Router();

//@method POST /api/profile/me
//@desc pegar perfil do atual user autenticado
//@acess Private
router.get('/me',
       auth, 
       async (req, res) => {
           
           try {
               let  profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
               // caso user não tenha perfil
               if (!profile) {
                return res.status(400).json({ errors: [{ msg: 'Usuário não possui perfil' }] })
               }
               // retornar perfil ao client side
               res.json(profile) 
           } catch (err) {
                console.log(err.message);
                res.status(500).send('Server error')
           }
       }
       )

//@method GET /api/user/:user_id
//@desc pegar perfil por user id
//@acess Public
router.get('/user/:user_id',

    async (req, res) => {
        
        try {
            let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
            // caso user não tenha perfil
            if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'Usuário não possui perfil' }] })
            }
            // retornar perfil ao client side
            res.json(profile) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

//@method GET /api/profile
//@desc pegar perfis cadastrados
//@acess Public
router.get('/',
       auth, 
       async (req, res) => {
           
           try {
               let  profiles = await Profile.find().populate('user', ['name', 'avatar'])
               // caso user não tenha perfil
               if (!profiles) {
                return res.status(400).json({ errors: [{ msg: 'Ainda não há perfis cadastrados' }] })
               }
               // retornar perfil ao client side
               res.json(profiles) 
           } catch (err) {
                console.log(err.message);
                res.status(500).send('Server error')
           }
       }
       )

//@method POST /api/profile
//@desc adicionar profile a conta
//@acess Private
router.post('/',
        auth,
        check('status', 'Status é necessário').notEmpty(),
        check('skills', 'Habilidades são necessárias').notEmpty(),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { 
            skills, 
            website, 
            youtube, 
            linkedin, 
            twitter, 
            instagram, 
            facebook,
            ...rest 
        } = req.body

            const profileFields = {
                user: req.user.id,
                website: website && website !== '' 
                ? normalize(website, { forceHttps: true }) : '',
                skills: Array.isArray(skills)
                ? skills : skills.split(',').map(skill => ' ' + skill.trim()),
                ...rest 
            }
        
        const socialFields = { youtube, linkedin, facebook, twitter, instagram };
        for (const [key, value] of Object.entries(socialFields)) {
            if (value && value.length > 0) {
                socialFields[key] = normalize(value, { forceHttps: true });
            }
        }
        profileFields.social = socialFields;

        try {
            
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            return res.json(profile)
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method PUT /api/profile/experience
//@desc adicionar campo de experiencia ao perfil
//@acess Private
router.put('/experience',
        auth,
        check('title', 'Título é necessário').notEmpty(),
        check('company', 'Empresa é necessária').notEmpty(),
        check('from', 'Data de inicío é necessária')
        .notEmpty()
        .custom((value, { req }) => req.body.to ? value < req.body.to : true),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            
            let  profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(req.body);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method DELETE /api/profile/experience/:exp_id
//@desc adicionar campo de experiencia ao perfil
//@acess Private
router.delete('/experience/:exp_id',
        auth,
        async (req, res) => {
        try {
            let  profile = await Profile.findOne({ user: req.user.id });
            profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);
            await profile.save();
            res.status(200).json(profile)
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method PUT /api/profile/experience
//@desc adicionar campo de educação ao perfil
//@acess Private
router.put('/education',
        auth,
        check('school', 'Instituição de ensino é necessária').notEmpty(),
        check('degree', 'Diploma é necessário').notEmpty(),
        check('fieldofstudy', 'Campo de estudo é necessário').notEmpty(),
        check('from', 'Data de inicío é necessária')
        .notEmpty()
        .custom((value, { req }) => req.body.to ? value < req.body.to : true),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            
            let  profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(req.body);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method DELETE /api/profile/education/:edu_id
//@desc adicionar campo de educação ao perfil
//@acess Private
router.delete('/education/:edu_id',
        auth,
        async (req, res) => {
        try {
            let  profile = await Profile.findOne({ user: req.user.id });
            profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.edu_id);
            await profile.save();
            res.status(200).json(profile)
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method GET /api/github/:username
//@desc pegar repos do github
//@acess Public
router.get('/github/:username',
       async (req, res) => {
           try {
               const uri = encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`);
               console.log(uri)
               const headers = {
                   'user-agent': 'node-js',
                   Authorization: `token ${config.get('githubToken')}`
               }
               const apiData = await axios.get(uri, { headers })
               return res.json(apiData.data);
           } catch (err) {
                console.log(err.message);
                res.status(404).json({ msg: 'Perfil github não encontrado' })
           }
       }
       )

//@method DELETE /api/profile
//@desc Deletar user, profile e posts
//@acess Private
router.delete('/',
auth, 
async (req, res) => {
    
    try {
        await Promise.all([
            User.findOneAndRemove({ _id: req.user.id }),
            Profile.findOneAndRemove({ user: req.user.id })
        ])
        res.json({ msg: 'Usuário deletado' });
    } catch (err) {
         console.log(err.message);
         res.status(500).send('Server error')
    }
}
)

module.exports = router