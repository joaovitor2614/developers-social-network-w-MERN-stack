import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { getProfileById } from '../../../actions/profile'
import { Grid, Paper } from '@material-ui/core';
import LoadingPage from '../../LoadingPage'
import Box from '@material-ui/core/Box';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileRepos from './ProfileRepos';



const useStyles = makeStyles((theme) => ({
   profileItem: {
       
       margin: 'auto',
       maxWidth: '700px',
       "@media (max-width: 900px)": {
        maxWidth: '400px',
        fontFamily: 'Roboto'
    },
    credentialsDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto'
    },
    
   }
  }))



const UserProfile = ({ match }) => {
    const dispatch = useDispatch()
    const profileState = useSelector(state => state.profile);
    const { loading, profile, repos } = profileState;
    const { profileItem, credentialsDiv } = useStyles();
    useEffect(() => {
        dispatch(getProfileById(match.params.id))
    }, [])
    return (
        <div>
            {loading ? (<LoadingPage />) : (
                <Fragment>
                    <Link to='/profiles'>Voltar aos perfis</Link>
                    {profile !== null && (
                        <div className={profileItem}>
                            <Grid>
                            <Link to='/profile/edit-profile'>Editar perfil</Link>
                            <ProfileTop profile={profile} />
                            
                                <ProfileAbout profile={profile} />
                           
                            

                            </Grid>
                            <Paper className={credentialsDiv} >
                                <Grid  container spacing={1}>
                                    <ProfileExperience experience={profile.experience} />
                                    <ProfileEducation education={profile.education} />
                                    <ProfileRepos username={profile.githubusername} />
                                 
                                    
                                   
                                </Grid>
                            </Paper>
                          
                            
                            
                        </div>
                    )}
                </Fragment>
            )
                        
        
                
            }
            
            
        </div>
    )
}

export default UserProfile

/*
 {profile.education.length > 0 ? profile.education.map((edu) => (
                                        <ProfileEducation key={edu._id} experience={edu} />
                                    )) : <h4 styles={{ textAlign: 'center'}}>Sem credenciais de Educação</h4>}
                                    {profile.githubusername !== '' && <ProfileRepos username={profile.githubusername} />}
                                    */