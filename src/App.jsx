import React from 'react';
import {Container}  from "@material-ui/core"

import Navbar from './component/navbar/Navbar';
import Home from './component/home/Home';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './component/auth/Auth';
import PostDetail from './component/postDetail/PostDetail'



function App() {
    const User  = JSON.parse(localStorage.getItem('profile'))


    return (
        <BrowserRouter>
         <Container maxWidth="xl">
         <Navbar/>
         <Switch>
             <Route path="/" exact component={()=> <Redirect to="/post" />} />

         <Route path="/post" exact component={Home}/>
         <Route path="/post/search" exact component={Home}/>
         <Route path="/post/:id" exact component={PostDetail}/>
        
        <Route path="/auth" component={()=> ( !User ? <Auth/> : <Redirect to="/post" />)} />
        
 
         
        
    
       
          
        </Switch>
        </Container>
        
        
        </BrowserRouter>
     
    )
}

export default App
