import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
materials: [],
loading: false,
error: null
};

export const fetchMaterials = createAsyncThunk(
    "/materials/fetchMaterials",
    async(_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.get(`/api/materials`, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const createMaterial = createAsyncThunk(
    "/materials/createMaterial",
    async ({materialData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/materials`, materialData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)


export const materialSlice = createSlice({
    name: 'material',
    initialState,
    reducers: {
      },
      extraReducers:(builder) => {
        builder
        .addCase(fetchMaterials.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMaterials.fulfilled, (state, action)=>{
            state.loading = false;
            state.materials = action.payload?.data.date;
        })
        .addCase(fetchMaterials.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createMaterial.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createMaterial.fulfilled, (state,action)=>{
            state.loading = false;
            state.materials.push(action?.payload?.data)
        })
        .addCase(createMaterial.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
      }
    })


    export default materialSlice.reducer