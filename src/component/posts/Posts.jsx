



import React from 'react';
import { CircularProgress ,Grid} from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Post from "./Post";

export default function Posts({setCurrentId}) {
    const   {posts, isLoading} = useSelector((state)=> state.posts);
   console.log(posts)
    const classes = useStyles();

   if(!Posts.length && !isLoading) return "No Posts"
    console.log(posts, isLoading)
    return (
    isLoading ? <CircularProgress/> 
      : (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post)=>(
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
        ))}

       </Grid>
         
       )
    )
}



