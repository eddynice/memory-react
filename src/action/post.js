import { END_LOADING, FETCH_POST, START_LOADING, FETCH_ALL, FETCH_BY_SEARCH, UPDATE, DELETE, LIKE, CREATE,COMMENT } from "../constant/actiontype"
import * as api from "../api";
//import post from "../reducer/post";

export const getPost = (id)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.getPost(id);
       // console.log(data)
        dispatch({type:FETCH_POST,payload:{post:data}})
        

       // dispatch({type : FETCH_ALL, payload:{data,currentPage, numberOfPages}}) 
       
        dispatch({type :END_LOADING})
    } catch (error) {
        console.log(error)
        
    }
}


export const getPosts = (page)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data:{data,currentPage, numberOfPages}} = await api.fetchPosts(page);
        dispatch({type:FETCH_ALL, payload:{data,currentPage, numberOfPages}})
        dispatch({type :END_LOADING})
    } catch (error) {
        console.log(error)
    }
}


export const getPostBySearch = (searchQuery)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
    dispatch({type:FETCH_BY_SEARCH, payload:{ data}});
    dispatch({type :END_LOADING})
             console.log(data)
        
    } catch (error) {
        console.log(error)
        
    }
    
}
export const createPost  = (post,history)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data} = await api.createPost(post);
        history.push(`/post/${data._id}`);
        dispatch({type:CREATE, payload:data})
        dispatch({type :END_LOADING})
    } catch (error) {
        console.log(error)
        
    }
}

export const updatePost = (id, post)=> async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({type:UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id)=> async(dispatch)=>{
    const user = JSON.parse(localStorage.getItem('profile'))
    try {
        const {data} = await api.likePost(id, user?.token);
        dispatch({type :LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}



export const commentPost = ( value, id)=> async(dispatch)=>{
    
    try {
        const {data} = await api.comment(value, id);
       dispatch({type :COMMENT, payload: data});
       return data.comment
     // console.log(data)
    } catch (error) {
        console.log(error)
    }
}


export const deletePost = (id)=> async(dispatch)=>{
    try {
       await api.deletePost(id);
        dispatch({type:DELETE, payload: id})
    } catch (error) {
        console.log(error)
        
    }
}