import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PostForm from './post/PostForm'
import { getPosts } from '../../actions/post';
import PostItem from './post/PostItem';




const DashboardPage = () => {
    const auth = useSelector(state => state.auth);
    const postState = useSelector(state => state.post);
    const { posts, loading } = postState;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [getPosts])
    
    if (!auth.isAuthenticated) {
        return <Redirect to='/login' />
    }
    return (
        <div>
          <PostForm />
          {posts.length > 0 && posts.map((post) => (
            <PostItem key={post._id} post={post} />
            ))}

        </div>
    )
}


export default DashboardPage