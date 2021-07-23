import React, { useState } from 'react';
import { Container, Avatar, Paper, Button, Grid } from "@material-ui/core"
import useStyles from "./styles";
import { LockOutlined } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import Input from "./Input";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import { signIn, signUp } from "../../action/auth"


const initalState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const [showpassword, setShowPassword] = useState(false)
    const [formDat, setFormData] = useState(initalState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formDat)
        if (isSignup) {
            dispatch(signUp(formDat, history))

        } else {
            dispatch(signIn(formDat, history))

        }

    }
    const handleChange = (e) => {
        setFormData({...formDat, [e.target.name]: e.target.value })
    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const switchMode = () => {
        setFormData(initalState)
        setIsSignup((prevSignup) => !prevSignup)
        setShowPassword(false)
    }
    return (

        <Container component= "main" maxWidth = "xs">
        <Paper className = {classes.paper} elevation={ 3}>
        < Avatar className = {classes.avatar }>
        <LockOutlined />
        
        </Avatar> 
        <Typography variant = "h5"> { isSignup ? "sign Up" : "sign in" }  </Typography> 
        <form className = { classes.form} onSubmit= {handleSubmit}>
        <Grid container spacing = { 2 } >
             {
            isSignup && ( 
            <>
                <Input name = "firstName"
                label = "first name"
                handleChange = { handleChange }
                autoFocus half />
                <Input name = "lastName"
                label = "last name"
                handleChange = { handleChange }
                half />
                </>
            )
        } 
        <Input name = "email"
        label = "Email Address"
        handleChange = { handleChange }
        type = "email"/>
        
        <Input name = "password"
        label = "password"
        handleChange = { handleChange }
        type = { showpassword ? 'text' : "password" }
        handleShowPassword = { handleShowPassword }
        /> 

        {
            isSignup && <Input name = "confirmPassword"
            label = "confirm Password"
            handleChange = { handleChange }
            type = "password"/>
        }

        </Grid> 
        <Button type = "submit"
        fullWidth color = "primary"
        className = { classes.submit }
        variant = "contained"> { isSignup ? "Sign Up" : "Sign In" } 
        </Button> 
        <Grid container justify = "flex-end" >
        <Grid item>
         <Button className = {classes.buttonSubmit} onClick = {switchMode}>
              { isSignup ? "already have an Acount ? signIn " : "Don't have an account ? sign in" } 
              </Button> 
              </Grid> 
              </Grid>

        </form> 
            </Paper>

        </Container>
    )
}

export default Auth