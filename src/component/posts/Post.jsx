import React,{useState} from 'react';
import useStyles from "./style";
import { Delete, MoreHoriz,ThumbUpOutlined, ThumbUpAlt } from '@material-ui/icons';
import {Typography, Button, Card, CardMedia, CardContent,CardActions, ButtonBase } from "@material-ui/core"
import moment from "moment";
import { useDispatch } from 'react-redux';
import {deletePost,likePost} from "../../action/post"
import { useHistory } from 'react-router-dom';


export default function Post({post, setCurrentId}) {
  const classes  = useStyles()
  const dispatch = useDispatch()
  const User  = JSON.parse(localStorage.getItem('profile'))
const history = useHistory();
const [likes, setLikes] = useState(post?.likes)

const openPost= ()=>{
  history.push(`/post/${post._id}`)

}
const userId =User?.result.googleId || User?.result?._id;
const hasLike = post.likes.find((like)=> like === userId)


const handleLike=  async ()=>{
  dispatch(likePost(post._id))
  if(hasLike){
    setLikes(post.likes.filter((id)=> id !== userId))
  } else{
    setLikes([
      ...post.likes, userId
    ])
  }
}

  const Likes = ()=>{
    if(likes.length > 0 ){
        return likes.find((like) => like === (User?.result?.googleId || User?.result?._id)) 
        ? (
            <><ThumbUpAlt fontSize="small"/> &nbsp; {likes.length > 2 ? `you and ${likes.length -1 }others`: `${likes.length} like${likes.length > 1 ? 's' :''}`}</>
         ): (
             <><ThumbUpOutlined fontSize="small"/> &nbsp;{likes.length} {likes.length ===1 ? 'Like' : 'Likes'}</>
         )    
    }
    return <> <ThumbUpOutlined fontSize="small"/> &nbsp; &nbsp;Like</>
}
    return (
      
       <Card className={classes.card} raised elevation={6}>
         
<ButtonBase component="span" name="test" className={classes.cardActions}  onClick={openPost} >


        
         <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
<div className={classes.overlay}>
<Typography variant="h6" >{post.name}</Typography>
<Typography variant="body" >{moment(post.createdAt).fromNow()}</Typography>
</div>
{(User?.result?.googleId === post?.creator || User?.result?._id === post?.creator) &&(
<div className={classes.overlay2} >
  <Button style={{color:'white'}} size="small"
   onClick={()=> setCurrentId(post._id)}>
    <MoreHoriz fontSize="default"/>
  </Button>

</div>
)}
<div className={classes.details}>
  <Typography variant="body2" color="textSecondary" > {post.tag.map((tg)=> `#${tg} `)}</Typography>

</div>
<Typography variant="h5" gutterBottom className={classes.title}> {post.title}</Typography>

<CardContent>
<Typography variant="body2" component="p" color="secondary" gutterBottom  > {post.message}</Typography>

</CardContent>
</ButtonBase>
<CardActions className={classes.cardAction}>
  <Button size="small" color="primary"      onClick={handleLike}>
    <Likes/>
  </Button>
  {(User?.result?.googleId === post?.creator || User?.result?._id === post?.creator) &&(
 <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
 <Delete fontSize="small" />
 Delete
</Button>

  ) }
 
</CardActions>
          
     </Card>         
    )
}




