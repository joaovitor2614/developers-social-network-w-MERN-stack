import React, { Fragment, useState } from 'react'
import CommentItem from './CommentItem'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { makeStyles } from '@material-ui/core/styles';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { addLike, addComment, removeLike, deletePost } from '../../../actions/post';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        marginTop: '100px'
    },
    postBox: {
        display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '15px 0',
      "@media (max-width: 900px)": {
        margin: '10px 0',
        flexDirection: 'column',
    }
    },
     postItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '25px 0',
      width: '450px',
      padding: '15px',
     
      "@media (max-width: 900px)": {
          margin: '10px 0',
        width: '300px',
        padding: '5px'
    }
    },
    commentItem: {
        display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '15px 0',
    },
    btnStyle: {
        marginRight: '13px',
        "@media (max-width: 900px)": {
            marginTop: '13px',
        }
         
    }
 
  }));


const PostItem = ({ post: { _id, name, user, avatar, text, postUrl, comments, likes, data }}) => {
    const [commentText, setCommentText] = useState('');
    const [expanded, setExpanded] = useState(false)
    const dispatch = useDispatch();
    const authId = useSelector(state => state.auth.user._id);

    
    const likesActions = (
        <div>
            {likes.length > 0 && <small>{likes.length}</small>}
            <IconButton onClick={() => dispatch(addLike(_id))} aria-label="give like" component="span">
                <ThumbUpIcon  />
            </IconButton>
            <IconButton onClick={() => dispatch(removeLike(_id))} aria-label="remove like" component="span">
                <ThumbDownIcon />
            </IconButton>
        </div>
    )
    const onCollapse = () => setExpanded(!expanded)
    const onSubmitComment = (e, _id, commentText) => {
        e.preventDefault();
    
        dispatch(addComment(_id, { commentText }));
       
    }
    const classes = useStyles();
    return (
        <div className={classes.postItem}>
            
            <div className={classes.postBox}>
                <Avatar alt="dev-pic" src={avatar} style={{ marginRight: '15px' }} />
                <h2>{name}</h2>
            </div>
                <small>{moment(data).fromNow()}</small>
            <p>{text}</p>
            {postUrl && (
                <img src={postUrl} alt="post pic" className="img-post"/>
            )}
           
             <div className={classes.postBox}>
                {authId === user && (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(deletePost(_id))}
                    >
                    
                      Excluir post
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={onCollapse}
                    startIcon={<CommentIcon />}
                    size='small'
                    style={{ marginRight: '15px' }}
                    >
                    Comentários {' '}{comments.length > 0 && comments.length}
                </Button>
                {likesActions}
             </div>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.commentItem}>
                    <form className={classes.postBox} onSubmit={(e) => onSubmitComment(e, _id, commentText)}>
                        <TextField name="text" type="text" label="Insira comentário..."
                            multiline rows={1} rowsMax={2} value={commentText} 
                            onChange={e => setCommentText(e.target.value)}
                            className={classes.btnStyle}
                        />
                        <Button className={classes.btnStyle} variant="contained" color="primary" type="submit">
                           Postar
                        </Button>
                    </form>
                    {comments.length > 0 && comments.map(comment => (
                        <CommentItem key={comment._id} postId={_id} comment={comment} />
                    ))}
                </div>
                
                
            </Collapse>
        </div>
    )
}

export default PostItem


