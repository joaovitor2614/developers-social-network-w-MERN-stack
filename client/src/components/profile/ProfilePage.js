import React, { Fragment, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import ExperienceDisplay from './experience/ExperienceDisplay'
import EducationDisplay from './education/EducationDisplay'
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
    parentGrid: {
        width: '100vw',
        height: '100vh',
         marginTop: '110px',
         
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         fontFamily: 'Roboto'
    },
    paperPainel: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        justifyContent: 'space-between',
        padding: '25px',
        width: '930px',
        textAlign: 'center',
        marginBottom: '40px',
        "@media (max-width: 900px)": {
         
            width: '300px',
            marginLeft: '60px',
            padding: '10px',
        
         
        }
        
    },
    paperContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        width: '960px',
        padding: '10px',
        "@media (max-width: 900px)": {
            justifyContent: 'center',
            flexDirection: 'column',
            width: '460px',
            padding: 0
        }
        
    },
    paperTitle: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '3px',
        marginBottom: '15px',
        "@media (max-width: 900px)": {
            display: 'none'
           
        }
        
    }

}))
export const ProfilePage = () => {
    const dispatch = useDispatch();
    const profileAuth = useSelector(state => state.profile);
    const { profile, loading } = profileAuth;
    const { parentGrid, paperPainel, paperContent, paperTitle } = useStyles();
    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [getCurrentProfile])
    return loading && profile === null ? <p>Carregando</p> : (
     
           <Grid className={parentGrid}>
            {profile === null ? (
            <Grid>
                    <p>Você ainda não tem um perfil</p>
                    <NavLink to='/profile/update-profile'>Crie seu perfil</NavLink>
                    
            </Grid>
                
            ) : (
            <Grid>
                <Paper elevation={2} className={paperPainel}>
                    <div>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} 
                            to='/profile/edit-profile'>
                            Editar perfil
                        </NavLink>
                        <AccountBoxIcon />
                    </div>
                    <div>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} 
                            to='/profile/add-edu'>
                            Adicionar educação
                            <SchoolIcon />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} 
                            to='/profile/add-exp'>
                            Adicionar experiência
                        </NavLink>
                        <WorkIcon />
                    </div>
                    
                    
                    
                </Paper>
                <Paper className={paperTitle}>
                    <h3>Experiência</h3><h3>Educação</h3>
                </Paper>
                <Paper className={paperContent}>
                    <div>      
                       <ExperienceDisplay experience={profile.experience} />
                    </div>
                    <div>
                       <EducationDisplay education={profile.education} />
                    </div>
                    
                </Paper>
                
              
                
            </Grid>   
            )}
           </Grid>
           
        
    )
       
    
}

export default ProfilePage
