//import axios from "axios";
import axios from "axios";


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
        if (localStorage.getItem('profile')) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        }
        return req;
    })
    //const API = axios.create({ baseURL: 'http://localhost:5000' })
    {
        /**
            
getPost
        export const getPosts = (page) => API.get(`/post?page=${page}`);
        export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'} &tag=${searchQuery.tag}`)
        export const createPost = (post) => API.post('/post', post)
        export const updatePost = (id, updatePost) => API.patch(`/post/${id}`, updatePost)
        export const deletePost = (id) => API.delete(`/post/${id}`);
        export const likePost = (id) => API.patch(`/post/${id}/likePost`)
        export const signin = (formDat) => API.post('/user/signin', formDat);
        export const signup = (formDat) => API.post('/user/signup', formDat);
fetchPosts

        */

    }
export const getPost = (id) => API.get(`/post/${id}`);
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'} &tag=${searchQuery.tag}`);
export const createPost = (post) => API.post('/post', post)
export const updatePost = (id, updatePost) => API.patch(`/post/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);
export const comment = (value, id) => API.post(`/post/${id}/commentPost`, { value });
export const signin = (formDat) => API.post('/user/signin', formDat);
export const signup = (formDat) => API.post('/user/signup', formDat);


//post?page=${item.page}