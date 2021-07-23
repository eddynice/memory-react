import { combineReducers } from "redux";
//import posts from "./post";
import auth from "./auth";
import posts from "./posts"

export default combineReducers({
    posts,
    auth
})