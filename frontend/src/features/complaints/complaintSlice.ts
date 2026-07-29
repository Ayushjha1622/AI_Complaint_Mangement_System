import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import ComplaintService from "./complaintService";
import type {
  ComplaintListResponse,
  ComplaintQuery,
} from "./complaintTypes";

interface ComplaintState {
  data: ComplaintListResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ComplaintState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchComplaints =
  createAsyncThunk(
    "complaints/fetch",
    async (query: ComplaintQuery) => {
      return await ComplaintService.getAll(query);
    }
  );

const complaintSlice = createSlice({
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
        state.data = action.payload;
      })

      .addCase(fetchComplaints.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load complaints";
      });
  },
});

export default complaintSlice.reducer;
