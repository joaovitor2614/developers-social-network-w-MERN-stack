import React, { useState } from 'react'
import registerSchema from '../../validation/registerSchema'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom'
import { register } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    formCenter: {
        width: '100vw',
        height: '100vh',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
    },
    formContent: {
        
        textAlign: 'center',
        marginTop: '170px'
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



export const Register = () => {
    const { inputRoot, formCenter, formContent } = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const initialValues = {
        name: '',
        email: '',
        password: '',
        password2: ''
    }
    if (auth.isAuthenticated) {
        return <Redirect to='/login' />
    }


    return (
        <Grid className={formCenter}>
            <Grid className={formContent}>
                <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log(values)
                    dispatch(register(values));
                    setSubmitting(false);
                }}>
                    {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting }) => (
                        <div>
                                <Form className={inputRoot}>
                                <h1>Registrar</h1>
                                <Field name="name" label="Insira nome"
                                onChange={handleChange} onBlur={handleBlur}
                                helperText={touched.name ? errors.name : ''}
                                error={touched.name && Boolean(errors.name)}
                                as={TextField}
                                
                                />
                                <Field name="email" type="email" label="Insira email"
                                onChange={handleChange} onBlur={handleBlur}
                                helperText={touched.email ? errors.email : ''}
                                error={touched.email && Boolean(errors.email)}
                                as={TextField} />

                                <Field name="password" type="password" label="Insira senha"
                                onChange={handleChange} onBlur={handleBlur}
                                helperText={touched.password ? errors.password : ''}
                                error={touched.password && Boolean(errors.password)}
                                as={TextField} />
                                <Field 
                                style={{ marginBottom: '25px' }}
                                    name="password2" type="password" label="Confirme sua senha"
                                    onChange={handleChange} onBlur={handleBlur} 
                                    helperText={touched.password2 ? errors.password2 : ''}
                                    error={touched.password2 && Boolean(errors.password2)}
                                    as={TextField} />

                               
                            </Form>
                            <div style={{ marginBottom: '20px' }}>
                                <Button variant="contained" 
                                disabled={!(isValid && dirty) || isSubmitting} 
                                color="primary" type="submit"  >Prosseguir</Button>
                            </div>
                            <h3 style={{ marginBottom: '15px' }}>Já tem uma conta na DevNet?</h3>
                            <NavLink to='/login'>Faça login</NavLink>
                        </div>
                    
                    )}
                </Formik>
            </Grid>
        </Grid>
        
    )
}


export default Register