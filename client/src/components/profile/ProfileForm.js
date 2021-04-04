import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Collapse from '@material-ui/core/Collapse';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import profileSchema from '../../validation/profileSchema';


const useStyles = makeStyles((theme) => ({
    formCenter: {
        width: '100vw',
        height: '100vh',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
    },
    formContent: {
        marginTop: '360px',
        textAlign: 'center',
    },
    inputDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputRoot: {
     '& .MuiFormControl-root': {
         width: '60%',
         margin: theme.spacing(2),
         "@media (max-width: 400px)": {
             width: '65%',
             margin: theme.spacing(2),
           },
     },
    }
    
    }))


export const ProfileForm = ({ handleSubmit, profile }) => {
    const [showSocial, setShowSocial] = useState(false);
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    const initialValues = {
        status: profile ? profile.status : '',
        skills: profile ? profile.skills : '',
        company: profile ? profile.company : '',
        website: profile ? profile.website : '',
        githubusername: profile ? profile.githubusername : '',
        bio: profile ? profile.bio : '',
        location: profile ? profile.location : '',
        youtube: profile ? profile.youtube : '',
        facebook: profile ? profile.facebook : '',
        instagram: profile ? profile.instagram : '',
        twitter: profile ? profile.twitter : '',
        linkedin: profile ? profile.linkedin : '',
    }
    

  
    useEffect(() => {
        if (Array.isArray(profile.skills)) {
            profile.skills = profile.skills.join(', ')
            initialValues.skills = profile.skills
        }
    }, [profile])

    const { inputRoot, formCenter, formContent, inputDiv } = useStyles();
    return (
        <Grid className={formCenter}>
            <Grid className={formContent}>
                <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values)
                handleSubmit(values, history)
                history.push('/profile')
                setSubmitting(false);
            }}>
                {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting }) => (
                 
                            <Form className={inputRoot}>
                            <div style={{ marginBottom: '15px' }}>
                                <h1>Preencher perfil</h1>
                                <small>* = campos obrigatórios</small>
                            </div>
                            <div className={inputDiv}>
                            
                                <Field
                                name="status"
                                id="demo-simple-select"
                                as={Select}
                            
                                >
                                <MenuItem value="">*  Selecione status profissional </MenuItem>
                                <MenuItem value="Desenvolvedor">Desenvolvedor</MenuItem>
                                <MenuItem value="Desenvolvedor Junior">Desenvolvedor Junior</MenuItem>
                                <MenuItem value="Desenvolvedor Sênior">Desenvolvedor Sênior</MenuItem>
                                <MenuItem value="Gerente">Gerente</MenuItem>
                                <MenuItem value="Estudante ou aprendendo">Estudante ou aprendendo</MenuItem>
                                <MenuItem value="Instrutor">Instructor Instrutor</MenuItem>
                                <MenuItem value="Estagiário">Estagiário</MenuItem>
                                <MenuItem value="Outros">Outros</MenuItem>
                                </Field>
                    
                    
                                <Field name="skills" type="text" label="*  Insira habilidades(ex: JS,React,Python)"
                                as={TextField}  helperText={touched.skills ? errors.skills : ''}
                                error={touched.skills && Boolean(errors.skills)}/>
                            </div>

                          
                        
                            <Field name="company" type="text" label="Insira empresa em que atua"
                            as={TextField}  helperText={touched.company ? errors.company : ''}
                            error={touched.company && Boolean(errors.company)}/>
                        
                            <Field name="website" type="text" label="Insira seu website"
                            as={TextField}  helperText={touched.website ? errors.website : ''}
                            error={touched.website && Boolean(errors.website)}/>
                            <Field name="location" type="text" label="Insira seu localização"
                            as={TextField}  helperText={touched.location ? errors.location : ''}
                            error={touched.location && Boolean(errors.location)}/>
                            <div style={{ marginBottom: '20px' }}>
                                <Field name="githubusername" type="text" label="Insira seu nome de usuário do github"
                                as={TextField}  helperText={touched.githubusername ? errors.githubusername : ''}
                                error={touched.githubusername && Boolean(errors.githubusername)}/>
                                
                            </div>
                            <small >
                                Se você quiser seu repositório recentes e seu Github link, 
                                
                            </small>
                            <small style={{ marginBottom: '30px' }}>
                               incluse seu usuário github
                            </small>
                            
                            
                            
                            <div>
                            <Button onClick={() => setShowSocial(!showSocial)}>
                                {showSocial ? 'Ocultar campos de redes sociais' : 'Adicionar redes sociais'}
                            </Button>
                                <Collapse in={showSocial} timeout="auto" unmountOnExit>
                                    <div className={inputRoot}>
                                        <Field name="twitter" type="text" label="Insira link para sua conta twitter"          
                                        as={TextField} helperText={touched.twitter ? errors.twitter : ''}
                                        error={touched.twitter && Boolean(errors.twitter)}
                                                InputProps={{startAdornment: (
                                                    <InputAdornment position="start">
                                                            <TwitterIcon/>
                                                    </InputAdornment>
                                                    )
                                                }}
                                                />
                                            
                                        
                                        <Field name="facebook" type="text" label="Insira link para sua conta facebook"          
                                        as={TextField} helperText={touched.facebook ? errors.facebook : ''}
                                        error={touched.facebook && Boolean(errors.facebook)}
                                        InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            <FacebookIcon/>
                                            </InputAdornment>
                                        )
                                        }}
                                        />
                                        
                                        <Field name="youtube" type="text" label="Insira link para sua conta youtube"          
                                        as={TextField} helperText={touched.youtube ? errors.youtube : ''}
                                        error={touched.youtube && Boolean(errors.youtube)}
                                            InputProps={{startAdornment: (
                                                    <InputAdornment position="start">
                                                    <YouTubeIcon/>
                                                    </InputAdornment>
                                            )}}/>
                                                
                                        
                                        <Field name="instagram" type="text" label="Insira link para sua conta instagram"          
                                        as={TextField} helperText={touched.instagram ? errors.instagram : ''}
                                        error={touched.instagram && Boolean(errors.instagram)}
                                            InputProps={{startAdornment: (
                                                <InputAdornment position="start">
                                                    <InstagramIcon/>
                                                </InputAdornment>
                                                    )}}
                                                />
                                        
                                        <Field name="linkedin" type="text" label="Insira link para sua conta linkedin"          
                                        as={TextField} helperText={touched.linkedin ? errors.linkedin : ''}
                                        error={touched.linkedin && Boolean(errors.linkedin)}
                                            InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                                <LinkedInIcon/>
                                            </InputAdornment>
                                                )}}
                                                />
                                    </div>
                                    
                                </Collapse>
                            </div>
                            
                            
                            <div>
                                <Field name="bio" type="text" label="Conte um pouco sobre você..."
                                multiline rows={4} rowsMax={6}
                                helperText={touched.bio ? errors.bio : ''}
                                error={touched.bio && Boolean(errors.bio)}
                                as={TextField} 
                                />
                        
                               
                            </div>
                            <Button variant="contained" 
                            color="primary" type="submit">Prosseguir</Button>
                           
                        </Form>
                        
            
                
                )}
            </Formik>
            </Grid>
        </Grid>
        
    )
}


export default ProfileForm