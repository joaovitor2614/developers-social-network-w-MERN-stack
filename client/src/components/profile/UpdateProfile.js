
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateProfile } from '../../actions/profile'
import ProfileForm from './ProfileForm'

const UpdateProfile = () => {
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch()
   const handleSubmit = (formData, history) => {
       dispatch(updateProfile(formData, history))
   }
    const { profile } = profileState
    return (
        <Fragment>
            {profile === null ? (<h1>Criar seu perfil</h1>) : (<h1>Atualizar perfil</h1>)}
            <ProfileForm handleSubmit={handleSubmit} />
        </Fragment>
    )
}

export default UpdateProfile
