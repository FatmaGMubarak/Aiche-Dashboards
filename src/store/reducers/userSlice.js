import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  loading: false,
  error: null,
};



export const getProfile = createAsyncThunk(
    "users/getProfile",
    async (_, {rejectWithValue, getState})=>{
        try{
            let token = getState().auth.token;
             if (!token) {
        token = Cookies.get("token") || localStorage.getItem("token");
      }

      if (!token) {
        return rejectWithValue("No token found");
      }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/profile`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)
export const updateProfile = createAsyncThunk(
    "users/updateProfile",
    async (formData, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.post(`/api/profile`, formData, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)
// export const requestToJoin = createAsyncThunk(
//     "users/requestToJoin",
//     async (id, {rejectWithValue, getState})=>{
//         try{
//             const token = getState().auth.token;
//             const formData = new FormData();
//       formData.append("committee_id", id); 
//             const config = {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               };
//             const response = await api.post(`/api/reqest-join`, formData, config)
//             return response.data
//         }catch (error){
//             return rejectWithValue(error.response?.data || error.message)
//         }
//     }
// )



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getProfile.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action?.payload;
      })
      .addCase(getProfile.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state)=>{
        state.loading = false;
        
      })
      .addCase(updateProfile.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      })
    //   .addCase(requestToJoin.pending, (state)=>{
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(requestToJoin.fulfilled, (state)=>{
    //     state.loading = false;
        
    //   })
    //   .addCase(requestToJoin.rejected, (state, action) =>{
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
      
  },
});

export default userSlice.reducer;
