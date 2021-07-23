import React,{useState, useRef}  from "react";
import {Typography, TextField , Button} from "@material-ui/core";
import useStyles from "./styles"
import {useDispatch} from "react-redux";
import {commentPost} from "../../action/post"

const CommentBox = ({post}) => {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comment)
    const [comment, setComment]  =useState('');
    const User  = JSON.parse(localStorage.getItem('profile'));
const dispatch = useDispatch()
const commentRef = useRef()

    console.log(post)

const handleClick = async ()=>{
    const finalComment = `${User.result.name} : ${comment}`

   const newComments= await dispatch(commentPost(finalComment, post._id));

   setComments(newComments);
   setComment('');
   commentRef.current.scrollIntoView({behaviour: 'smooth'})
}

    return ( 
        <div> 
            <div className={classes.commentCont}>
                <div className={classes.commentInner}>
               
                <Typography gutterBottom variant="h6">Comment</Typography>
            {comments.map((c, i)=>(
                <Typography key={i} gutterBottom variant="subtitle1">
                
                     <strong>{c.split(':')[0]}</strong>
                     {c.split(':')[1]}
              
                </Typography>
            ))}
            <div ref={commentRef}/>
            </div>
            
            {User?.result?.name && (
                 <div style={{width:'70%'}}>
                 <Typography gutterBottom variant="h6">write Comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="comment" value={comment}
            onChange={(e)=> setComment(e.target.value)}
            />
            <Button style={{marginTop:'10px'}} fullWidth onClick={handleClick} disabled={!comment.length} variant='contained'>
            Comment
            </Button>
                 </div>

            )}
           

                </div>
            
            
      </div>
    )
}

export default CommentBox