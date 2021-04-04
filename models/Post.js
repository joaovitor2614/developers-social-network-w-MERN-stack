const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    text: {
        type: String,
        required: true
    },
    postUrl: String,
    name: String,
    avatar: String,
    comments: 
    [
    {
         
        text: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        name: String,
        avatar: String,
        data: {
            type: Date,
            default: Date.now
        }

    
    }
     ],

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);