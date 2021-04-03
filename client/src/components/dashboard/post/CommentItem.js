import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { removeComment } from '../../../actions/post';

const CommentItem = ({ postId, comment: { _id, user, name, avatar, text, data}}) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.auth.user);
    
    return (
        <div>
            <Avatar alt="dev-pic" src={avatar} />
            <p>{name}</p>
            <p>{text}</p>
            {userState._id === user && <Button onClick={() => dispatch(removeComment(postId, _id))} size="small">
                Remover comentario
            </Button>}
        </div>
    )
};


export default CommentItem