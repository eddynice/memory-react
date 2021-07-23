import React, { useState, useEffect } from 'react';
import { Typography, Paper, } from "@material-ui/core"
import useStyles from "./styles"
import { TextField, Button } from '@material-ui/core';
import FileBase from "react-file-base64"
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../action/post';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//const inital =()
export default function Form({ currentId, setCurrentId }) {
    const [postData, SetpostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    
    const user = JSON.parse(localStorage.getItem('profile'))
   const history  = useHistory()
    console.log(post)

    useEffect(() => {
        if (post) {
            SetpostData(post)

        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name }, history))
         
        }
        clear()

    }

    const clear = () => {
        setCurrentId(null);
        SetpostData({ title: '', message: '', tags: '', selectedFile: '' })

    }

    if (!user?.result?.name) {
        return (
           <Paper className = { classes.paper } >
            <Typography variant = "h6"
            align = "center" >
            Pls sign in to create your memory
             </Typography>
             </Paper>
        )
    }
    return (
       <Paper className = { classes.paper } elevation = {6} >

         <form autoComplete = "off"
        noValidate className = { `${classes.root} ${classes.form}` }
        onSubmit = { handleSubmit }>
        
        <Typography variant = "h6"> { currentId ? "Editing" : "Creating" }
        a Memory Create Memory </Typography>


        
        <TextField name = "title"
        variant = "outlined"
        label = "title"
        className = { classes.text }
        fullWidth value = { postData.title }
        onChange = {
            (e) => SetpostData({...postData, title: e.target.value }) }
        />

        
        <TextField name = "message"
        variant = "outlined"
        label = "message"
        className = { classes.text }
        fullWidth value = { postData.message }
        onChange = {
            (e) => SetpostData({...postData, message: e.target.value }) }
        />

        
        <TextField name = "tags"
        variant = "outlined"
        label = "tags"
        className = { classes.text }
        fullWidth value = { postData.tags }
        onChange = {
            (e) => SetpostData({...postData, tags: e.target.value.split(',') }) }
        /> 
        <div className = { classes.fileInput } >
        
        <FileBase type = "file"
        multiple = { false }
        className = { classes.fileInput }
        onDone = {
            ({ base64 }) => SetpostData({...postData, selectedFile: base64 }) }
        /> 
        </div> 
        <Button className = { classes.buttonSubmit }
        fullWidth variant = "contained"
        color = "primary"
        size = "large"
        type = "submit"> SUBMIT </Button>
         <Button variant = "contained"
        fullWidth color = "secondary"
        size = "small"
        onClick = { clear } > Clear </Button> 
        </form> 
        </Paper>
    )
}