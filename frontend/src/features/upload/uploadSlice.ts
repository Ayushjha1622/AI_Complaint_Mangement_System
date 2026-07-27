import { createSlice } from "@reduxjs/toolkit";
import type { UploadState } from "@/features/upload/types/upload.ts";

const initialState: UploadState = {
  files: [],
  uploading: false,
  error: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUploading: (state, action: { payload: boolean }) => {
      state.uploading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
  },
});

export const { setUploading, setError } = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
