import React,{useEffect} from 'react'
//import style from './Styles';
//import useStyles from './Style'
import { PaginationItem, Pagination } from '@material-ui/lab';
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import useStyle from './Style'
import {getPosts} from "../action/post"

export default function Paginate({page}) {
    console.log(page)
    const classes = useStyle();
 const dispatch = useDispatch();
 const  { numberOfPages} = useSelector((state)=>state.posts);
//const {posts} = useSelector((state)=> state.post);
console.log(numberOfPages)
 
        useEffect(() => {
       if(page) dispatch(getPosts(page))
    }, [page]);
    

  return (
        <Pagination
        classes={{ul:classes.ul}}
         count={numberOfPages}
         page={Number(page) || 1}
         variant="outlined"
         color="primary"
         renderItem={(item)=>(
             <PaginationItem {...item}
              component={Link}  
              to={`/post?page=${item.page}`}
              //to={`/post?page=${1}`}
              />
         )}

        />
    )


}
