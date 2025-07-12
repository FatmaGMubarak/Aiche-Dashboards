import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error:null,
};

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async (_, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/blogs`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchBlogById = createAsyncThunk(
    "blogs/fetchBlogById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/blogs/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createBlog = createAsyncThunk(
    "/blogs/createBlog",
    async (blogData,{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/blogs`, blogData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateBlog = createAsyncThunk(
    "/blogs/updateBlog",
    async({id, newBlogData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/blogs/${id}`, newBlogData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)
export const deleteBlog = createAsyncThunk(
    "/blogs/deleteBlog",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
             await api.delete(`/api/blogs/${id}`, config);
            return id
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchBlogs.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchBlogs.fulfilled, (state, action)=>{
        state.loading = false;
        state.blogs = action?.payload?.data;
    })
    .addCase(fetchBlogs.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchBlogById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchBlogById.fulfilled, (state, action)=>{
        state.loading = false
        state.blog = action?.payload?.data
    })
    .addCase(fetchBlogById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createBlog.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createBlog.fulfilled, (state, action)=>{
        state.loading = false;
        state.blogs.push(action?.payload?.data)
    })
    .addCase(createBlog.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateBlog.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateBlog.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateBlog.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteBlog.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteBlog.fulfilled, (state, action)=>{
        state.loading = false;
        state.blogs = state.blogs.filter((selected)=>selected.id != action.payload)
    })
    .addCase(deleteBlog.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
}
})


export default blogSlice.reducer