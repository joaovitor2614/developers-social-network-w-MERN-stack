import React, { Fragment, useState } from 'react'
import CommentItem from './CommentItem'
import { useDispatch } from 'react-redux'
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
import { addLike, addComment, removeLike } from '../../../actions/post';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        marginTop: '100px'
    }
 
  }));

  const initialValues = {
      tex: ''
  }

const PostItem = ({ post: { _id, name, user, avatar, text, postUrl, comments, likes, data }}) => {
    const [commentText, setCommentText] = useState('');
    const [expanded, setExpanded] = useState(false)
    const dispatch = useDispatch();
    const likesActions = (
        <Fragment>
            {likes.length > 0 && <small>{likes.length}</small>}
            <IconButton onClick={() => dispatch(addLike(_id))} aria-label="give like" component="span">
                <ThumbUpIcon  />
            </IconButton>
            <IconButton onClick={() => dispatch(removeLike(_id))} aria-label="remove like" component="span">
                <ThumbDownIcon />
            </IconButton>
        </Fragment>
    )
    const onCollapse = () => setExpanded(!expanded)
    const onSubmitComment = (e, _id, commentText) => {
        e.preventDefault();
        console.log(_id, commentText)
        dispatch(addComment(_id, { commentText }));
       
    }
    const classes = useStyles();
    return (
        <div>
            <small>{moment(data).fromNow()}</small>
            <h4>{name}</h4>
            <Avatar alt="dev-pic" src={avatar} />
            <p>{text}</p>
            {postUrl && (
                <img src={postUrl} alt="post pic" className="img-post"/>
            )}
           
                
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={onCollapse}
                startIcon={<CommentIcon />}
                >
                Comentários {' '}{comments.length > 0 && comments.length}
            </Button>
            {likesActions}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <form onSubmit={(e) => onSubmitComment(e, _id, commentText)}>
                    <TextField name="text" type="text" label="Adicione um comentário"
                        multiline rows={1} rowsMax={2} value={commentText} 
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
                    Postar
                    </Button>
                </form>
                {comments.length > 0 && comments.map(comment => (
                    <CommentItem key={comment._id} postId={_id} comment={comment} />
                ))}
                
            </Collapse>
        </div>
    )
}

export default PostItem


