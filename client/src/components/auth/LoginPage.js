import React, { Fragment, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../../actions/auth'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import loginSchema from '../../validation/loginSchema'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
   },
   inputRoot: {
    '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(2),
        "@media (max-width: 400px)": {
            width: '65%',
            margin: theme.spacing(2),
          },
    },
    
}
   }))


export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { formCenter, inputRoot, formContent } = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const initialValues = {
        email: '',
        password: ''
    }
 
   
    if (auth.isAuthenticated) {
        return <Redirect to='/dashboard' />
    };
  


    return (    <Grid className={formCenter}>
                       <Grid className={formContent}>
                        <Formik
                                validateOnChange={true}
                                initialValues={initialValues}
                                validationSchema={loginSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    console.log(values)
                                    dispatch(login(values));
                                    setSubmitting(false);
                                }}>
                                
                                {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting }) => (
                                    <div>
                                            <Form className={inputRoot}>
                                            <h1>Login</h1>
                                            
                                            <Field name="email" type="email" label="Insira email"
                                                onChange={handleChange} onBlur={handleBlur}
                                                helperText={touched.email ? errors.email : ''}
                                                error={touched.email && Boolean(errors.email)}
                                                as={TextField} />

                                            <Field name="password" type={showPassword ? 'text' : 'password'} 
                                                label="Insira senha"
                                                onChange={handleChange} onBlur={handleBlur}
                                                helperText={touched.password ? errors.password : ''}
                                                error={touched.password && Boolean(errors.password)}
                                                as={TextField} style={{ marginBottom: '30px' }} 
                                                InputProps={{
                                                    startAdornment: (
                                                      <InputAdornment 
                                                      onClick={() => setShowPassword(!showPassword)} 
                                                      position="start">
                                                        {showPassword ? <VisibilityIcon /> :
                                                            <VisibilityOffIcon />}
                                                      </InputAdornment>
                                                    )
                                                  }}
                                                />
                                        

                                                <Button style={{ marginBottom: '25px' }} 
                                                variant="contained" 
                                                disabled={!(isValid && dirty) || isSubmitting} 
                                                color="primary" type="submit">Prosseguir</Button>
                                        </Form>
                                        
                                        <h3 style={{ marginBottom: '15px' }}>Novo na DevNet?</h3>
                                        <NavLink to='/register'>Crie uma conta</NavLink>
                                    </div>
                                            
                                        )}
                                    
                            
                            </Formik>
                       </Grid>
                        
                        
                </Grid>
                
                   
      
         
    )
}


export default LoginPage