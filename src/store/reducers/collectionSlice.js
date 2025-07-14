import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  collections: [],
  collection: null,
  loading: false,
  error:null,
};

export const fetchCollections = createAsyncThunk(
    "collections/fetchCollections",
    async (_, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/collections`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchCollectionById = createAsyncThunk(
    "collections/fetchCollectionById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/collections/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createCollection = createAsyncThunk(
    "/collections/createCollection",
    async (collectionData,{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/collections`, collectionData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateCollection = createAsyncThunk(
    "/collections/updateCollection",
    async({id, newcollectionData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/collections/${id}`, newcollectionData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)
export const deleteCollection = createAsyncThunk(
    "/collections/deleteCollection",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
             await api.delete(`/api/collections/${id}`, config);
            return id
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchCollections.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCollections.fulfilled, (state, action)=>{
        state.loading = false;
        state.collections = action?.payload?.data;
    })
    .addCase(fetchCollections.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchCollectionById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchCollectionById.fulfilled, (state, action)=>{
        state.loading = false
        state.collection = action?.payload?.data
    })
    .addCase(fetchCollectionById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createCollection.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createCollection.fulfilled, (state, action)=>{
        state.loading = false;
        state.collections.push(action?.payload?.data)
    })
    .addCase(createCollection.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateCollection.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateCollection.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateCollection.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteCollection.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteCollection.fulfilled, (state, action)=>{
        state.loading = false;
        state.collections = state.collections.filter((selected)=>selected.id != action.payload)
    })
    .addCase(deleteCollection.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
}
})


export default collectionSlice.reducer