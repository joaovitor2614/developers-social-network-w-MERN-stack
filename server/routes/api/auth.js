const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator')

const auth = require('../../middlewares/auth')
const User = require('../../models/User')
const router = express.Router();

//@method POST /api/auth
//@desc logar user e pegar token
//@acess Public
router.post('/', 
       check('email', 'Email é necessário').exists(),
       check('password', 'Senha deve ter no mínimo 6 caracteres ').isLength({ min: 6 }),
       async (req, res) => {
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() })
           }
           const { email, password } = req.body
           try {
               let user = await User.findOne({ email });
               if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Usuário não existe' }] })
               }
               
               // comparar senhar com bcrypt
               const isMatch = await bcrypt.compare(password, user.password);
               if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Credenciais inválidas' }] })
               }

               const payload = {
                   user: {
                       id: user.id
                   }
               }
               jwt.sign(
                   payload, 
                config.get('jwtSecret'), 
                { expiresIn: '5 days' },
                (err, token) => {
                   if (err) throw err;
                    res.json({ token })
               })
           } catch (err) {
                console.log(err.message);
                res.status(500).send('Server error')
           }
       }
       )


//@method GET /api/auth
//@desc pegar perfil autenticado
//@acess Private
router.get('/',
  auth, 
  async (req, res) => {
    
    try {
        let user = await User.findById(req.user.id).select('-password')
        
        // retornar user ao client side
        res.json(user) 
    } catch (err) {
         console.log(err.message);
         res.status(500).send('Server error')
    }
}
)

module.exports = router