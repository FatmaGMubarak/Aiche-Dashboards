import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  sessions: [],
  session: null,
  loading: false,
  error:null,
};

export const fetchSessions = createAsyncThunk(
    "sessions/fetchSessions",
    async (_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/sessions`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchSessionById = createAsyncThunk(
    "sessions/fetchSessionById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/sessions/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createSession = createAsyncThunk(
    "/sessions/createSession",
    async ({committee_id, sessionData},{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/committees/${committee_id}/sessions`, sessionData, config)
            return response?.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async ({ committee_id, session_id, updatedData }, {rejectWithValue, getState}) => {
    try {
                    const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
      const response = await api.put(
        `/api/committees/${committee_id}/sessions/${session_id}`,
        updatedData,config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteSession = createAsyncThunk(
    "/sessions/deleteSession",
    async({comm_id, id}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.delete(`/api/committees/${comm_id}/sessions/${id}`, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchSessions.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchSessions.fulfilled, (state, action)=>{
        state.loading = false;
        state.sessions = action?.payload?.data;
    })
    .addCase(fetchSessions.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchSessionById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchSessionById.fulfilled, (state, action)=>{
        state.loading = false
        state.session = action?.payload?.data
    })
    .addCase(fetchSessionById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createSession.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createSession.fulfilled, (state, action)=>{
        state.loading = false;
        state.sessions.push(action?.payload?.data)
    })
    .addCase(createSession.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateSession.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateSession.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateSession.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteSession.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteSession.fulfilled, (state, action)=>{
        state.loading = false;
        state.sessions = state.sessions.filter((selected)=>selected.id !== action.meta.arg)
    })
    .addCase(deleteSession.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
}
})


export default sessionSlice.reducer