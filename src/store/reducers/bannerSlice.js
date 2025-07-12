import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
banners: [],
loading: false,
error: null
};

export const fetchBanners = createAsyncThunk(
    "/baners/fetchBanners",
    async(_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.get(`/api/baners`, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const createBanner = createAsyncThunk(
    "/baners/createBanner",
    async (materialData, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/baners`, materialData, config)
            return response?.data
        }catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)


export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
      },
      extraReducers:(builder) => {
        builder
        .addCase(fetchBanners.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBanners.fulfilled, (state, action)=>{
            state.loading = false;
            state.banners = action.payload?.baners;
        })
        .addCase(fetchBanners.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createBanner.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createBanner.fulfilled, (state,action)=>{
            state.loading = false;
            state.banners.push(action?.payload?.baners)
        })
        .addCase(createBanner.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
      }
    })


    export default bannerSlice.reducer