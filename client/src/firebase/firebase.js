import { firebase } from '@firebase/app';
import 'firebase/storage'


const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID
};



firebase.initializeApp(config);



const projectStorage = firebase.storage();



export default projectStorage