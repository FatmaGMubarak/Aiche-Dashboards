import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl";
import { config } from "@fortawesome/fontawesome-svg-core";

const initialState = {
    events: [],
    event:  null,
    loading:  false,
    error: null,
    images: [],
}

export const fetchEvents = createAsyncThunk(
    "/events/fetchEvents",
    async(_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.get(`/api/events`, config)
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const fetchEventById = createAsyncThunk(
    "events/fetchEventById",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }
            const response = await api.get(`/api/events/${id}`, config)
            return response?.data
        }catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async(eventData, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }
            const response = await api.post("/api/events", eventData, config)
            return response?.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async({id, newEventData}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.put(`/api/events/${id}`, newEventData, config)
            return response.data
        }catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async(id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.delete(`/api/events/${id}`, config)
            return response?.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }

    }
)

export const updateImage = createAsyncThunk(
    "EventImage/updateImage",
    async ({id, formData}, { rejectWithValue , getState})=>{
        try{
            const token = getState().auth.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await api.post(`/api/EventImage/${id}`, formData, config);
        return response.data;

      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const deleteImage = createAsyncThunk(
    "EventImage/deleteImage",
    async (imgId, { rejectWithValue , getState})=>{
        try{
            const token = getState().auth.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await api.delete(`/api/EventImage/${imgId}`, config);
        return response.data;

      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      },
      extraReducers:(builder)=>{
        builder
        .addCase(fetchEvents.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchEvents.fulfilled, (state,action)=>{
            state.loading = false;
            state.events = action.payload?.data
        })
        .addCase(fetchEvents.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchEventById.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchEventById.fulfilled, (state, action)=>{
            state.loading = false;
            state.event = action.payload?.data
        })
        .addCase(fetchEventById.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })
        .addCase(updateEvent.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateEvent.fulfilled, (state)=>{
            state.loading = false;
        })
        .addCase(updateEvent.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createEvent.pending, (state)=>{
            state.loading = true;
        })
        .addCase(createEvent.fulfilled, (state, action)=>{
            state.loading = false;
            state.events.push(action.payload?.data)
        })
        .addCase(createEvent.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteEvent.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteEvent.fulfilled, (state, action)=>{
            state.loading = false;
            state.events = state.events.filter((n)=>n.id != action.payload)
        })
        .addCase(deleteEvent.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteImage.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteImage.fulfilled, (state, action) => {
            state.loading = false;
            const deletedId = action.payload;
            state.images = state.images.filter((img) => img.id !== deletedId);
          })

        .addCase(deleteImage.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateImage.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateImage.fulfilled, (state) => {
            state.loading = false;
          })

        .addCase(updateImage.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
      }




    })


    export default eventSlice.reducer