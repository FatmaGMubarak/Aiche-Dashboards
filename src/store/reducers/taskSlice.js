import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/baseUrl"

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error:null,
};

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const response = await api.get(`/api/tasks`, config)
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchTaskById = createAsyncThunk(
    "tasks/fetchTaskById",
    async (id, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization :`Bearer ${token}`,
                }
            }
            const response = await api.get(`/api/tasks/${id}`, config)
            return response.data
        }catch(error){
            return rejectWithValue (error.response?.data || error.message)
        }
    }
)

export const createTask = createAsyncThunk(
    "/tasks/createTask",
    async ({committee_id, taskData},{rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await api.post(`/api/committees/${committee_id}/tasks`, taskData, config)
            return response?.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ committee_id, task_id, updatedData }, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
      const response = await api.put(
        `/api/committees/${committee_id}/tasks/${task_id}`,
        updatedData,config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
    "/tasks/deleteTask",
    async({comm_id, id}, {rejectWithValue, getState})=>{
        try{
            const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await api.delete(`/api/committees/${comm_id}/tasks/${id}`, config);
            return response.data
        } catch(error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    },
extraReducers: (builder) =>{
    builder
    .addCase(fetchTasks.pending, (state)=> {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchTasks.fulfilled, (state, action)=>{
        state.loading = false;
        state.tasks = action?.payload?.data;
    })
    .addCase(fetchTasks.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(fetchTaskById.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(fetchTaskById.fulfilled, (state, action)=>{
        state.loading = false
        state.task = action?.payload?.data
    })
    .addCase(fetchTaskById.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase(createTask.pending, (state)=>{
        state.loading = true;
        state.error = null
    })
    .addCase(createTask.fulfilled, (state, action)=>{
        state.loading = false;
        state.tasks.push(action?.payload?.data)
    })
    .addCase(createTask.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateTask.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateTask.fulfilled, (state)=>{
        state.loading = false;
    })
    .addCase(updateTask.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteTask.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteTask.fulfilled, (state, action)=>{
        state.loading = false;
        state.tasks = state.tasks.filter((selected)=>selected.id !== action.meta.arg)
    })
    .addCase(deleteTask.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload
    })
}
})


export default taskSlice.reducer