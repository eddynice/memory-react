//import { CREATE, DELETE, UPDATE, FETCH_ALL } from "../../srcc/constants/actiontype";
import { END_LOADING, FETCH_ALL,DELETE, UPDATE, CREATE,FETCH_BY_SEARCH,FETCH_POST, LIKE, START_LOADING,COMMENT } from "../constant/actiontype";


const authReducer = (state ={isLoading:true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading:true};
         case END_LOADING:
             return { ...state, isLoading:false}   
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
         case FETCH_BY_SEARCH:
             return { ...state, posts: action.payload.data} ;
         case FETCH_POST:
                return { ...state, post: action.payload.post} ;
        case LIKE:
            return{ ...state, posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
            case COMMENT:
            return{ ...state,
                 posts:state.posts.map((post) => {
                     //change the post that just recieved a comment..
                     if(post._id === action.payload._id){
                         return action.payload;
                     }
                     //return all d other post
                     return post
                 })
                };
        case CREATE:
            return {...state, posts: [...state, action.payload]}

        case UPDATE:
            return {...state, posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};

        case DELETE:
            return {...state, posts:state.posts.filter((post) => post._id !== action.payload)}


        default:
            return state;

    }
}

export default authReducer;