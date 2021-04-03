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
import experienceSchema from '../../../validation/experienceSchema';
import { addExperience } from '../../../actions/profile';


const useStyles = makeStyles((theme) => ({
    formCenter: {
        width: '100vw',
        height: '100vh',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center'
    },
    formContent: {
        marginTop: '210px',
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

export const AddExperience = ({experience}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const initialValues = {
        title: experience ? experience.title : '',
        company: experience ? experience.company : '',
        location: experience ? experience.location : '',
        description: experience ? experience.description : '',
        from: experience ? experience.from : '',
        current: experience ? experience.current : false,
        to: experience ? experience.to : '',
    }
 
     const { formCenter, formContent, inputRoot } = useStyles();
    return (
                <Grid className={formCenter}>
                    <Grid className={formContent}>
                        <Formik
                        validateOnChange={true}
                        initialValues={initialValues}
                        validationSchema={experienceSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            dispatch(addExperience(values, history));
                            setSubmitting(false);
                        }}>
                        
                        {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting, values, setFieldValue }) => (
                        
                                    <div>
                                        <Form className={inputRoot}>
                                        <div>
                                            <h1>Adicionar experiência</h1>
                                            <small>* = campos obrigatórios</small>
                                        </div>
                                        
                                        <Field name="title" type="text" label="*  Insira título"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.title ? errors.title : ''}
                                            error={touched.title && Boolean(errors.title)}
                                            as={TextField} />
        
                                        <Field name="company" type="text" label="*  Insira empresa"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.company ? errors.company : ''}
                                            error={touched.company && Boolean(errors.company)}
                                            as={TextField} />
                                        <div>
                                            <InputLabel id="current">Ainda atua na empresa?</InputLabel>
                                            <FormControlLabel
                                                control={<Field as={CheckBox} labelid="current" 
                                                checked={values.current} 
                                                onChange={() => setFieldValue("current", !values.current)} 
                                                />}
                                                label="Sim"
                                            />
                                        </div>
                                    
                                        
                                    
                                    
                                        
                                        <InputLabel id="from">Insira data de início</InputLabel>
                                        <Field name="from" type="date" labelid="from"
                                            onChange={handleChange} onBlur={handleBlur}
                                            helperText={touched.from ? errors.from : ''}
                                            error={touched.from && Boolean(errors.from)}
                                            as={TextField} />
                                        <InputLabel id="to">Insira data de término</InputLabel>
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
                                        <Field name="description" type="text" label="Descreva sua atuação no cargo"
                                            multiline rows={2} rowsMax={4}
                                            helperText={touched.description ? errors.description : ''}
                                            error={touched.description && Boolean(errors.description)}
                                            as={TextField} 
                                        />
                                        <div>
                                            <Button variant="contained" color="primary" type="submit">
                                                Adicionar
                                            </Button>                                                                                           
                                        </div>
                                    
        
                                            
                                    </Form>
                                    
                                    
                                </div>
              
                            )}
                      
                      </Formik>
                    </Grid>
                </Grid>
         
    )
}


export default AddExperience