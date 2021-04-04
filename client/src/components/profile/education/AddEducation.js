import React, { Fragment, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CheckBox from '@material-ui/core/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import educationSchema from '../../../validation/educationSchema';
import { addEducation } from '../../../actions/profile';



const useStyles = makeStyles((theme) => ({
    formCenter: {
        width: '100vw',
        height: '100vh',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
    },
    formContent: {
        marginTop: '325px',
        textAlign: 'center',
    },
    inputRoot: {
     '& .MuiFormControl-root': {
         width: '57%',
         margin: theme.spacing(2),
         "@media (max-width: 400px)": {
             width: '65%',
             margin: theme.spacing(2),
           },
     },
    }
    
    }))

export const AddEducation = ({ education }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const initialValues = {
        school: education ? education.school : '',
        degree: education ? education.degree : '',
        fieldofstudy: education ? education.fieldofstudy : '',
        description: education ? education.description : '',
        location: education ? education.location : '',
        from: education ? education.from : '',
        current: education ? education.current : false,
        to: education ? education.to : '',
    }
 
     const { formCenter, formContent, inputRoot } = useStyles();
    return (
                <Grid className={formCenter}>
                    <Grid className={formContent}>
                        <Formik
                        validateOnChange={true}
                        initialValues={initialValues}
                        validationSchema={educationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            dispatch(addEducation(values, history));
                            setSubmitting(false);
                        }}>
                        
                        {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting, values, setFieldValue }) => (
                            
                                    <div>
                                        <Form className={inputRoot}>
                                        <div>
                                            <h1>Adicionar experiência</h1>
                                            <small>* = campos obrigatórios</small>
                                        </div>
                                        
                                        <Field name="school" type="text" label="*  Insira instituição educacional"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.school ? errors.school : ''}
                                            error={touched.school && Boolean(errors.school)}
                                            as={TextField} />

                                        <Field name="degree" type="text" 
                                            label= "*  Insira categoria do certificado"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.degree ? errors.degree : ''}
                                            error={touched.degree && Boolean(errors.degree)}
                                            as={TextField} />
                                        <Field name="fieldofstudy" type="text" 
                                            label="*  Insira campo de estudo"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.fieldofstudy ? errors.fieldofstudy : ''}
                                            error={touched.fieldofstudy && Boolean(errors.fieldofstudy)}
                                            as={TextField} />
                                        <div>
                                            <InputLabel id="current">Ainda faz o curso?</InputLabel>
                                            <FormControlLabel
                                                control={<Field as={CheckBox} labelid="current" 
                                                checked={values.current} 
                                                onChange={() => setFieldValue("current", !values.current)} 
                                                />}
                                                label="Sim"
                                            />
                                        </div>
                                    
                                       
                                       
                                    
                                    
                                        
                                        <InputLabel id="from">Data de início</InputLabel>
                                        <Field name="from" type="date" labelid="from"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.from ? errors.from : ''}
                                            error={touched.from && Boolean(errors.from)}
                                            as={TextField} />
                                        <InputLabel id="to">Data de término</InputLabel>
                                        <Field disabled={values.current} name="to" labelid="to" type="date" 
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.to ? errors.to : ''}
                                            error={touched.to && Boolean(errors.to)}
                                            as={TextField} />
                                        <Field name="location" type="text" label="Insira localização"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.location ? errors.location : ''}
                                            error={touched.location && Boolean(errors.location)}
                                            as={TextField} />
                                            
                                        <Field name="description" type="text" label="Descreva como foi o curso"
                                            multiline rows={2} rowsMax={4}
                                            helperText={touched.description ? errors.description : ''}
                                            error={touched.description && Boolean(errors.description)}
                                            as={TextField} 
                                        />
                                    
                                            <div>
                                                <Button variant="contained" 
                                                color="primary" type="submit">Adicionar</Button>
                                            </div>
                                            
                                    </Form>
                                    
                                    
                                </div>
                                
                        
                        
                            )}
                        
                                
                        
                        </Formik>
                    </Grid>
                </Grid>
                   
      
         
    )
}


export default AddEducation