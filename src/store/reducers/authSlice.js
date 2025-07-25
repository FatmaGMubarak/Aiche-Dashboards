import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/baseUrl";
import { LoadData } from "../../utilis/LoadData";

const initialState = {
  admim: null,
  admin: null,
  user: null,
  token: null,
  loading: false,
  error: null,
  admins: []
};

export const loginAdmin = createAsyncThunk(
  "/admin/loginAdmin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/admin/login", loginData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "/admin/registerAdmin",
  async (registerData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
            const config = {
                headers: 
                {
                    Authorization : `Bearer ${token}`
                }
            }
      const response = await api.post("/api/admin/register", registerData, config);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);





const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialAuth: (state) => {
      const { token, admim, admin } = LoadData();

      if (token) state.token = token;
      if (admim) state.admim = admim;
      if (admin) state.admin = admin;
    },
    logout: (state) => {
      state.admim = null;
      state.admin = null;
      state.token = null;
      Cookies.remove("token");
      localStorage.removeItem("admim");
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;

        const user = action.payload?.user;
        const role = user?.title;

        if (role === "admim") {
          state.admim = user;
          localStorage.setItem("admim", JSON.stringify(user));
        } else if (role === "admin") {
          state.admin = user;
          localStorage.setItem("admin", JSON.stringify(user));
        }
          state.user = user;

        localStorage.setItem("token", action.payload?.token);
        if (action.payload?.token) {
          Cookies.set("token", action.payload.token, { expires: 7 });
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
  state.loading = false;
  // const user = state.user;
  // const role = user?.title;

  // if (role === "admin") {
  //   state.admin = user;
  //   localStorage.setItem("admin", JSON.stringify(user));
  // }

  // state.token = action.payload?.token;
  // localStorage.setItem("token", action.payload?.token);

  // if (action.payload?.token) {
  //   Cookies.set("token", action.payload.token, { expires: 7 });
  // }
})

      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { initialAuth, logout } = authSlice.actions;
export default authSlice.reducer;
