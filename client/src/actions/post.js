import axios from 'axios';
import { toast } from 'react-toastify'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');
        dispatch({
            type: 'GET_POSTS',
            payload: res.data
        })
       
    } catch (err) {
      console.log(err)
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/post', formData, config);
        dispatch({
            type: 'ADD_POST',
            payload: res.data
        })
        toast.success(`📝  Post adicionado`, {
            position: "top-center",
            autoClose: 1100,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })

            
        
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${postId}`);
        dispatch({
            type: 'UPDATE_LIKES',
            payload: { postId, likes: res.data }
        })      
    } catch (err) {
        console.log(err);
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
};

export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlike/${postId}`);
        dispatch({
            type: 'UPDATE_LIKES',
            payload: { postId, likes: res.data }
        })      
    } catch (err) {
        console.log(err)
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const addComment = (postId, commentText) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/comments/${postId}`, commentText, config);
        dispatch({
            type: 'UPDATE_COMMENT',
            payload: { comments: res.data, postId }
        })           
        
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const removeComment = (postId, commentId) => async dispatch => {
 
    try {
        const res = await axios.delete(`/api/post/comments/${postId}/${commentId}`);
        dispatch({
            type: 'UPDATE_COMMENT',
            payload: { comments: res.data, postId }
        })           
        
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'POST_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}