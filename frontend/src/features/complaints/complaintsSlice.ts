import { createSlice } from "@reduxjs/toolkit";
import type { ComplaintsState } from "@/features/complaints/types/complaints.ts";

const initialState: ComplaintsState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
};

const complaintsSlice = createSlice({
  name: "complaints",
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

export const { setLoading, setError } = complaintsSlice.actions;
export const complaintsReducer = complaintsSlice.reducer;
