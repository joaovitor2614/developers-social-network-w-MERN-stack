const express = require('express')
const config = require('config');
const axios = require('axios');
const normalize = require('normalize-url')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middlewares/auth')
const router = express.Router();


//@method POST /api/post
//@desc adicionar post
//@acess Private
router.post('/',
        auth,
        check('text', 'Texto é necessário').notEmpty(),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let user = await User.findById(req.user.id).select("-password");
            const newPost = new Post({
                user: req.user.id,
                name: user.name,
                avatar: user.avatar,
                text: req.body.text,
                postUrl: req.body.postUrl
            })

            const post = await newPost.save();
            res.json(post)
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method DELETE /api/post/:postId
//@desc deletar post
//@acess Private
router.delete('/:postId',
        auth,
        async (req, res) => {

        try {
            let post = await Post.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
            }
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ errors: [{ msg: 'Usuário não autorizado' }] })
            }

            await post.remove();
            res.json({ msg: 'Post removido' })
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method GET /api/user/:postId
//@desc pegar post por id
//@acess Private
router.get('/:postId',

    async (req, res) => {
        
        try {
            let post = await Post.findById(req.params.postId);
       
            if (!post) {
                return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
            }
            // retornar post ao client side
            res.json(post) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

//@method GET /api/post
//@desc pegar todos os posts
//@acess Private
router.get('/',

    async (req, res) => {
        
        try {
            let posts = await Post.find().sort({ date: -1 })
       
            if (!posts) {
                return res.status(404).json({ errors: [{ msg: 'Sem posts adicionados recentemente' }] })
            }
            // retornar post ao client side
            res.json(posts) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

//@method put /api/post/likes/:postId
//@desc dar like ao post
//@acess Private
router.put('/like/:postId',
    auth,
    async (req, res) => {
        
        try {
            console.log(req.params.postId)
            let post = await Post.findById(req.params.postId);
            console.log(post)
       
            if (!post) {
                return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
            }
            if (post.likes.some(like => like.user.toString() === req.user.id)) {
                return res.status(400).json({ errors: [{ msg: 'Perfil já recebeu like' }] })
            }
            post.likes.unshift({ user: req.user.id })
            await post.save();
            // retornar post ao client side
            res.json(post.likes) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

//@method put /api/post/likes/:postId
//@desc retirar like do post
//@acess Private
router.put('/unlike/:postId',
    auth,
    async (req, res) => {
        
        try {
            let post = await Post.findById(req.params.postId);
       
            if (!post) {
                return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
            }
            if (!post.likes.some(like => like.user.toString() === req.user.id)) {
                return res.status(400).json({ errors: [{ msg: 'Perfil ainda não recebeu like' }] })
            }
            post.likes = post.likes.filter(
                ({ user }) => user.toString() !== req.user.id
            )
            await post.save();
            // retornar post ao client side
            res.json(post.likes) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

//@method POST /api/post/comments/:postId
//@desc adicionar comentário
//@acess Private
router.post('/comments/:postId',
        auth,
        check('commentText', 'Texto é necessário').notEmpty(),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let post = await Post.findById(req.params.postId);
            let user = await User.findById(req.user.id).select("-password");
            console.log(post)
            const newComment = {
                user: req.user.id,
                name: user.name,
                avatar: user.avatar,
                text: req.body.commentText
            }

            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments)
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
}
)

//@method POST /api/post/comments/:postId/:commentId
//@desc deletar comentário
//@acess Private
router.delete('/comments/:postId/:commentId',
    auth,
    async (req, res) => {
        
        try {
            let post = await Post.findById(req.params.postId);
       
            if (!post) {
                return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
            }
            
            const comment = post.comments.find(comment => comment.id === req.params.commentId);
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Usuario não autorizado' });
              }
            comment.remove();
            await post.save();
            // retornar post ao client side
            res.json(post.comments) 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    }
)

module.exports = router;