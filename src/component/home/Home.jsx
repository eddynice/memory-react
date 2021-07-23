import React, { useState,useEffect} from 'react';
import { Container,TextField,Button, AppBar, 
    Typography, Grow, Grid, Paper, Chip } from "@material-ui/core"
import Posts from "../posts/Posts";
import Form from "../form/Form"
import { getPosts,getPostBySearch } from "../../action/post"
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Paginate from '../Paginate';
//import ChipInput from "material-ui-chip-input"
import { useLocation,useHistory } from 'react-router-dom';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export default function Home() {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState([])
   
    
    

    const handleAdd=(tags)=>{
        setTag([ ...tag, tags])

    }
    const handleDelete=(tagtoDelete)=>{
        setTag(tag.filter((tags)=> tags !== tagtoDelete))

    }
    
    const searchTearm =()=>{
        if(search.trim() || tag){
         
            dispatch(getPostBySearch({search, tag:tag.join(',')}))
            history.push(`/post/search?searchQuery=${search || 'none'}& tag=${tag.join(',')}`)
        }else{
            history.push('/')
        }
    }
    const handleKeyPress=(e)=>{
        if(e.keyCode === 13){

            searchTearm();
        }

    }
    
    return (

        <Grow in>
        <Container maxWidth="xl" >
        <Grid className = { classes.gridContainer } container justify = "space-between" alignItems = "stretch"  spacing= { 3 }>
        <Grid item xs = { 12} sm={6} md={9}>
            <Posts setCurrentId ={setCurrentId}/>
            </Grid>
            <Grid item xs ={12} sm ={4}>
        
            <AppBar className={classes.appBarSear} position="static" color="inherit">
            <TextField name="search" variant="outlined" label="Sewrch Memories"
        fullWidth value={search} onChange={(e)=>setSearch(e.target.value)} 
            onKeyPress={handleKeyPress}
            />
                        
<Chip style={{margin:'10px 0'}}  value={tag}   onClick={handleAdd} onDelete={handleDelete}
 variant="outlined"  label="search tag" />

<Button  onClick={searchTearm} className={classes.searchButton} variant="contained" color="primary"> Search
</Button>
            </AppBar>

        

       
        <Form currentId ={currentId}
        setCurrentId={setCurrentId }/>
        {(!searchQuery && !tag.length) && (
                 <Paper elevation={6}   className={ classes.pagination} >
                      <Paginate page={page}/>
                     </Paper>
            )}
           

        

        </Grid> </Grid> </Container>
         </Grow>
    )
}