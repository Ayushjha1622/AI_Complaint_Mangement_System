import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { DashboardService } from "./dashboardService";
import type { DashboardData } from "./dashboardTypes";

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, thunkAPI) => {
    try {
      return await DashboardService.getDashboard();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load dashboard data");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;



