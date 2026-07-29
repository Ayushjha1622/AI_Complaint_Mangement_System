import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { AuthService } from "./authService";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  token: localStorage.getItem("access_token"),
  user: null,
  isAuthenticated: false,
  loading: !!localStorage.getItem("access_token"),
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const tokenData = await AuthService.login(username, password);
      // Store token immediately so that the getMe API call includes it in headers
      localStorage.setItem("access_token", tokenData.access_token);
      const user = await AuthService.getMe();
      return {
        token: tokenData.access_token,
        user,
      };
    } catch (err: any) {
      localStorage.removeItem("access_token");
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await AuthService.getMe();
      return user;
    } catch (err: any) {
      localStorage.removeItem("access_token");
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Session expired"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
    },
  },

  extraReducers(builder) {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
