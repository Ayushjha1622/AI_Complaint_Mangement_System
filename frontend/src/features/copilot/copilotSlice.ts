import { createSlice } from "@reduxjs/toolkit";
import type { CopilotState } from "@/features/copilot/types/copilot.ts";

const initialState: CopilotState = {
  messages: [],
  loading: false,
  error: null,
};

const copilotSlice = createSlice({
  name: "copilot",
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

export const { setLoading, setError } = copilotSlice.actions;
export const copilotReducer = copilotSlice.reducer;
