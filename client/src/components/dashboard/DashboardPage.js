import React, { useEffect, Fragment } from 'react'
import LoadingPage from '../LoadingPage'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PostForm from './post/PostForm'
import { getPosts } from '../../actions/post';
import PostItem from './post/PostItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    postGrid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto'
    },
    postsGrid: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }
    
    }))

const DashboardPage = () => {
    const auth = useSelector(state => state.auth);
    const postState = useSelector(state => state.post);
    const { posts, loading, user } = postState;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [getPosts])
    
    if (!auth.isAuthenticated) {
        return <Redirect to='/login' />
    }
    const { postGrid, postsGrid } = useStyles();
    return auth.user !== null && posts !== null && loading === false ? (
         <Grid container className={postGrid}>
          <PostForm  />
          <div className={postsGrid}>
            {posts.length > 0 && posts.map((post) => (
                <PostItem key={post._id} post={post} />
                ))}
          </div>
         

        </Grid>
    ) : <LoadingPage />
       
    
}


export default DashboardPage