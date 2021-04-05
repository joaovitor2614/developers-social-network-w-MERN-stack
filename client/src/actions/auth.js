import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { toast } from 'react-toastify'



export const logout = () => dispatch => {
    dispatch({
        type: 'CLEAR_PROFILE'
    })
    dispatch({
        type: 'LOGOUT'
    })
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: 'USER_LOADED',
            payload: res.data
        })
    } catch (err) {
        console.log(err)
      dispatch({
          type: 'AUTH_ERROR',
      })
    }
}


export const register = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
      
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: 'REGISTER_SUCESS',
            payload: res.data
        })
        toast.success('🚀 Registrado com sucesso', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch(loadUser())
       
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'REGISTER_FAIL',
      })
    }
}

export const login = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/auth', formData, config);
        dispatch({
            type: 'LOGIN_SUCESS',
            payload: res.data
        })
        toast.success('😎 Login Efetuado com sucesso!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(`❌ ${error.msg}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }))
        }
      
      dispatch({
          type: 'LOGIN_FAIL',
      })
    }
}