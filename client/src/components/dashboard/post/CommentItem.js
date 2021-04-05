import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { removeComment } from '../../../actions/post';



const useStyles = makeStyles((theme) => ({
  
    commentBox: {
        display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '15px 0'
    },
 
  }));

const CommentItem = ({ postId, comment: { _id, user, name, avatar, text, data}}) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.auth.user);
    const { commentBox } = useStyles();
    return (
        <div>
            <div className={commentBox}>
                <Avatar style={{ marginRight: '10px' }} alt="dev-pic" src={avatar} />
                <h4>{name}</h4>
            </div>
            
            <p>{text}</p>
            {userState._id === user && <Button variant="contained"
            color="primary" onClick={() => dispatch(removeComment(postId, _id))} size="small">
                Remover comentario
            </Button>}
        </div>
    )
};


export default CommentItem