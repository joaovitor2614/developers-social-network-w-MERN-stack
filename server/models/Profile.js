const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    status: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    bio: String,
    githubusername: String,
    company: String,
    website: String,
    location: String,
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            to: {
                type: Date,
               
            },
            location: String,
            description: String
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            to: Date,        
            location: String,
            description: String
        }
    ],
    social: {
        youtube: String,
        facebook: String,
        instagram: String,
        linkedin: String,
        twitter: String
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);