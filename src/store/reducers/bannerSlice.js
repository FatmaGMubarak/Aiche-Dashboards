import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
banners: [],
loading: false,
error: null,
banner: null,
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

export const fetchBannerById = createAsyncThunk(
    "banners/fetchBannerById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/baners/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
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

export const updateBanner = createAsyncThunk(
    "/banners/updateBanner",
    async({id, newBannerData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/baners/${id}`, newBannerData, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)
export const deleteBanner = createAsyncThunk(
    "/banners/deleteBanner",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
             await api.delete(`/api/baners/${id}`, config);
            return id
        } catch(error){
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
        }) .addCase(updateBanner.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBanner.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(updateBanner.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteBanner.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBanner.fulfilled, (state, action)=>{
                state.loading = false;
                state.banners = state.banners.filter((selected)=>selected.id != action.payload)
            })
            .addCase(deleteBanner.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload
            }).addCase(fetchBannerById.pending, (state)=>{
                    state.loading = true;
                    state.error = null
                })
                .addCase(fetchBannerById.fulfilled, (state, action)=>{
                    state.loading = false
                    state.banner = action?.payload?.baner
                })
                .addCase(fetchBannerById.rejected, (state, action)=>{
                    state.loading = false
                    state.error = action.payload
                })
      }
    })


    export default bannerSlice.reducer