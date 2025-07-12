import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  committees: [],
  committee: null,
  loading: false,
  error:null,
};

export const fetchCommittee = createAsyncThunk(
    "committees/fetchCommittee",
    async (_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/committees`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchCommitteeById = createAsyncThunk(
    "committees/fetchCommitteeById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/committees/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createCommittee = createAsyncThunk(
    "/committees/createCommittee",
    async (committeeData,{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/committees`, committeeData, config)
            return response?.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateCommittee = createAsyncThunk(
    "/committees/updateCommittee",
    async({id, newCommitteeData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.put(`/api/committees/${id}`, newCommitteeData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)
export const deleteCommittee = createAsyncThunk(
    "/committees/deleteCommittee",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.delete(`/api/committees/${id}`, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const committeeSlice = createSlice({
  name: 'committee',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchCommittee.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCommittee.fulfilled, (state, action)=>{
        state.loading = false;
        state.committees = action?.payload?.data;
    })
    .addCase(fetchCommittee.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchCommitteeById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchCommitteeById.fulfilled, (state, action)=>{
        state.loading = false
        state.committee = action?.payload?.data
    })
    .addCase(fetchCommitteeById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createCommittee.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createCommittee.fulfilled, (state, action)=>{
        state.loading = false;
        state.committees.push(action?.payload?.data)
    })
    .addCase(createCommittee.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateCommittee.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateCommittee.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateCommittee.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteCommittee.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteCommittee.fulfilled, (state, action)=>{
        state.loading = false;
        state.committees = state.committees.filter((selected)=>selected.id !== action.meta.arg)
    })
    .addCase(deleteCommittee.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
}
})


export default committeeSlice.reducer