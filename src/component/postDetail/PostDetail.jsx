import React,{useEffect} from "react";
import {Paper,Typography, CircularProgress, Divider} from '@material-ui/core';
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {getPostBySearch } from "../../action/post"

import { useHistory } from 'react-router-dom';
import {useSelector} from "react-redux"
import moment from 'moment'
//import useStyle from './Style'
import {getPost} from "../../action/post"
import {useParams} from "react-router-dom";
import CommentBox from "./CommentBox";


const PostDetail =()=>{
const classes  = useStyles()
const  { post, posts, isLoading} = useSelector((state)=>state.posts);
console.log(posts)
    const dispatch = useDispatch()
    const history = useHistory();
    const { id } = useParams();


    useEffect(()=>{
      dispatch(getPost(id))
    },[id]);


useEffect(()=>{
      if(posts){
        dispatch(getPostBySearch({search:'none', tag:post?.tag.join('')}))
      }
    },[post]);

    if(!post) return null;
    if(isLoading){
      return(
        <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em"  />
        </Paper>
      )
    }
const recommendation = posts.filter(({_id})=> _id !== post._id);

const openPost = (_id)=> history.push(`/post/${_id}`)
  return (
    <Paper style={{padding: '20px', borderRadius:'15px'}} elevation={6} >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography variant="h6" gutterBottom color="textSecondary" component="h2">{post.title}</Typography>
          <Typography varaiant="body2" gutterBottom component="p" >{post.message}</Typography>
          <Typography variant="h6" >{post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{margin: '20px 0'}}/>
          <Typography variant='body1' ><strong>RealTime chat</strong></Typography>
          <Divider style={{margin: '20px 0'}}/>
          <CommentBox post={post}/>
       
        </div>
        <div className={classes.imgSection}>
          <img className={classes.media} src={post.selectedFile || '' } alt="home" />
        </div>
      </div>
{recommendation.length && (
  <div className={classes.section}>
    <Typography gutterBotton variant="h5">you might aiso like</Typography>
    <Divider />
    <div className={classes.recommendationPost}>
      {recommendation.map(({title, message, name, likes, selectedFile, _id})=>(
        <div style={{margin:'20px', cursor: 'pointer'}} onClick={()=> openPost(_id)}>
          <Typography gutterBotton variant="h6">{title}</Typography>
          <Typography gutterBotton variant="subtitle">{name}</Typography>
          <Typography gutterBotton variant="h6">{message}</Typography>
          <Typography gutterBotton variant="subtitle"> Likes{likes.length}</Typography>
          <img src={selectedFile} alt="kkd" width="200px"/>
           </div>

      ))}
    </div>
  </div>
)}
    </Paper>

  )
}

export default PostDetail
