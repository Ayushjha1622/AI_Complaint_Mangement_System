import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ComplaintService from "@/services/complaint.service";
import type { Complaint } from "@/types/complaint";
import type { ComplaintQuery } from "./complaintTypes";

interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

interface ComplaintState {
  complaints: Complaint[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

const initialState: ComplaintState = {
  complaints: [],
  pagination: {
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 1,
  },
  loading: false,
  error: null,
};

export const fetchComplaints = createAsyncThunk(
  "complaints/fetch",
  async (query: ComplaintQuery, thunkAPI) => {
    try {
      return await ComplaintService.getAll(query);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to fetch complaints"
      );
    }
  }
);

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const complaintsReducer = complaintsSlice.reducer;
export default complaintsReducer;
