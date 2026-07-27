import { createSlice } from "@reduxjs/toolkit";
import type { DashboardState } from "@/features/dashboard/types/dashboard.ts";

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
