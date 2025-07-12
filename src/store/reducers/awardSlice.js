import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";

const initialState = {
     awards: [],
     award: null,
     loading: false,
     error: null,
}

export const fetchAwards = createAsyncThunk(
    "/events/fetchAwards",
    async(_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth?.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.get(`/api/awards`, config)
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const fetchAwardById = createAsyncThunk(
    "awards/fetchAwardById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth?.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/awards/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createAward = createAsyncThunk(
    "/blogs/createAward",
    async (awardData,{rejectWithValue, getState})=>{
        try{
            const token = getState().auth?.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/awards`, awardData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


export const updateAward = createAsyncThunk(
    "/awards/updateAward",
    async({id, newAwardData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth?.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.get(`/api/awards/${id}`, newAwardData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const deleteAward = createAsyncThunk(
    "/awards/deleteAward",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth?.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
             await api.delete(`/api/awards/${id}`, config);
            return id
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const awardSlice = createSlice({
    name: 'award',
    initialState,
    reducers: {
      },
extraReducers:(builder)=>{
        builder
        .addCase(fetchAwards.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAwards.fulfilled, (state,action)=>{
            state.loading = false;
            state.awards = action?.payload?.data
        })
        .addCase(fetchAwards.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(fetchAwardById.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(fetchAwardById.fulfilled, (state, action)=>{
                state.loading = false
                state.award = action?.payload?.data
            })
            .addCase(fetchAwardById.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })
                .addCase(updateAward.pending, (state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateAward.fulfilled, (state)=>{
                    state.loading = false;
                })
                .addCase(updateAward.rejected, (state, action)=>{
                    state.loading = false;
                    state.error = action.payload
                })
                    .addCase(createAward.pending, (state)=>{
                        state.loading = true;
                        state.error = null
                    })
                    .addCase(createAward.fulfilled, (state, action)=>{
                        state.loading = false;
                        state.awards.push(action?.payload?.data)
                    })
                    .addCase(createAward.rejected, (state, action)=>{
                        state.loading = false;
                        state.error = action.payload;
                    })
                        .addCase(deleteAward.pending, (state)=>{
                            state.loading = true;
                            state.error = null;
                        })
                        .addCase(deleteAward.fulfilled, (state, action)=>{
                            state.loading = false;
                            state.awards = state.awards.filter((selected)=>selected.id != action.payload)
                        })
                        .addCase(deleteAward.rejected, (state, action)=>{
                            state.loading = false;
                            state.error = action.payload
                        })
      }

    })


    export default awardSlice.reducer