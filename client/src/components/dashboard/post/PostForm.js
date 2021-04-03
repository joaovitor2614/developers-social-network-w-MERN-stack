import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../actions/post'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import postSchema from '../../../validation/postSchema';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import ImageIcon from '@material-ui/icons/Image';
import Progress from './Progress';
import PostItem from './PostItem'
const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        justify: "center",
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        },
        
    },
    
    input: {
        display: 'none'
    }
}));

const initialValues = {
    text: '',
    postUrl: ''
    
}

export const PostForm = () => {
    const postState = useSelector(state => state.post);
    const { posts, loading } = postState;
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const dispatch = useDispatch();
   

    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    const handleFile = e => {
        const selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setFileError(null)
        } else {
            setFileError('Por favor insira um formato de img válido(png, jpeg, jpg');
            setFile(null);
        }
        }
        const classes = useStyles();
        const inputFile = (
            <Fragment>
                <input accept="image/*" className={classes.input} 
                    onChange={handleFile} id="icon-button-file" 
                    type="file" 
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <ImageIcon />
                    </IconButton>
                </label>
              
                
            </Fragment>
           
        )
        
    

    return (
        <Formik
        validateOnChange={true}
        initialValues={initialValues}
        validationSchema={postSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(imgUrl)
            if (imgUrl !== '') {
                console.log('index')
                values.postUrl = imgUrl
                console.log(values.postUrl)
            }
            
            dispatch(addPost(values));
            setSubmitting(false);
            setImgUrl('')
        }}>
        
        {({ errors, touched, handleChange, handleBlur, isValid, dirty, isSubmitting }) => (
            <Grid container className={classes.root}>
                <Form>
                    <Field name="text" type="text" label="Adicione um post.."
                    multiline rows={3} rowsMax={6} 
                    onChange={handleChange} onBlur={handleBlur}
                    helperText={touched.text ? errors.text : ''}
                    error={touched.text && Boolean(errors.text)}
                    as={TextField}  InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                              {inputFile}
                          </InputAdornment>
                        )
                      }}
                    />
                    {fileError && <p>{fileError}</p>}
                 
                    
                    {file && (<Progress setFile={setFile} setImgUrl={setImgUrl} file={file}/>)}
                    <Button variant="contained" 
                    disabled={!(isValid && dirty) || isSubmitting} 
                    color="primary" type="submit">Postar</Button>
                </Form>
    
            </Grid>                
                )}
      
        </Formik>
           
    )
}

export default PostForm


