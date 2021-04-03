import axios from 'axios'
import { toast } from 'react-toastify'


export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.statusText }
        })
        console.log(err)
       
    }
}

export const updateProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data
        })
        toast.success(`📝 ${edit ? 'Perfil atualizado com sucesso' : 'Perfil criado com sucesso'}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        if (edit === false) {
            history.push('/dashboard')
        }
            
        
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'PROFILE_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        })
        toast.success('📝 Experiência adicionada', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        history.push('/profile')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'PROFILE_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}

export const deleteExperience = (expId) => async dispatch => {
  
    
    try {
        const res = await axios.delete(`/api/profile/experience/${expId}`);
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        })
        toast.success('❌  Experiência removida', {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
     
    } catch (err) {
      dispatch({
          type: 'PROFILE_ERROR',
          payload: { msg: err.response.statusText }
      })
    }
}


export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        })
        toast.success('📝 Educação adicionada', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        history.push('/profile')
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => console.log(error))
        }
      dispatch({
          type: 'PROFILE_ERROR',
      })
    }
}

export const deleteEducation = (eduId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${eduId}`);
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        })
        toast.success('❌  Educação removida', {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
     
    } catch (err) {
      dispatch({
          type: 'PROFILE_ERROR',
          payload: { msg: err.response.statusText}
      })
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({ type: 'CLEAR_PROFILE' })
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: 'GET_PROFILES',
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.statusText }
        })
        console.log(err)
       
    }
}

export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`)
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.statusText }
        })
       
    }
}

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: 'GET_REPOS',
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: { msg: err.response.statusText }
        })
       
    }
}
