import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api"; // your axios instance

// Create async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post(`${import.meta.env.VITE_AUTH_LOGIN}`, credentials);
      console.log(res)
      return res.data; // return user and token
    } catch (err) {
      console.error("Login error in thunk:", err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        console.log(action.payload.user)
        localStorage.setItem("token", action.payload.token);
      })
    //   .addCase(loginUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload.message;
    //   });
  },
});


export const { logout } = authSlices.actions;

    
export default authSlices.reducer;
