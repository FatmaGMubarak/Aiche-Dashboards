import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";

const initialState = {
  loading: false,
  error: null,
  admins: [],
  members:[]
};



export const fetchAdmins = createAsyncThunk(
    "admins/fetchAdmins",
    async (_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/admins`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


export const assignAdminToCommittee = createAsyncThunk(
  "committees/assignAdminToCommittee",
  async({adminId, committeeId}, {rejectWithValue, getState})=>{
    try{
      const token = getState().auth.token;
      const config = {
        headers: {
                  Authorization: `Bearer ${token}`,
        }
      }
      const response = await api.post(`/api/committees/setAdmin`, {admin_id: adminId,
          committee_id: committeeId,}, config)
          return response.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
  }
)
export const pendingRequests = createAsyncThunk(
  "admins/pendingRequests",
  async(formData, {rejectWithValue, getState})=>{
    try{
      const token = getState().auth.token;
      const config = {
        headers: {
                  Authorization: `Bearer ${token}`,
        }
      }
      const response = await api.post(`/api/inactive-members`, formData , config)
          return response?.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
  }
)

export const approveRequest = createAsyncThunk(
  "admins/approveRequest",
  async(formData, {rejectWithValue, getState})=>{
    try{
      const token = getState().auth.token;
      const config = {
        headers: {
                  Authorization: `Bearer ${token}`,
        }
      }
      const response = await api.post(`/api/approveMemberRequest`, formData , config)
          return response?.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
  }
)

export const rejectRequest = createAsyncThunk(
  "admins/rejectRequest",
  async(formData, {rejectWithValue, getState})=>{
    try{
      const token = getState().auth.token;
      const config = {
        headers: {
                  Authorization: `Bearer ${token}`,
        }
      }
      const response = await api.post(`/api/rejectMemberRequest`, formData , config)
          return response?.data
    }catch(error){
        return rejectWithValue(error.response.data || error.message)
    }
  }
)




const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAdmins.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action)=>{
        state.loading = false;
        state.admins = action?.payload?.admins;
      })
      .addCase(fetchAdmins.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignAdminToCommittee.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(assignAdminToCommittee.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(assignAdminToCommittee.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(pendingRequests.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(pendingRequests.fulfilled, (state, action)=>{
        state.loading = false;
        state.members = action.payload?.members
      })
      .addCase(pendingRequests.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveRequest.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRequest.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(approveRequest.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectRequest.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state)=>{
        state.loading = false;
      })
      .addCase(rejectRequest.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default adminSlice.reducer;
