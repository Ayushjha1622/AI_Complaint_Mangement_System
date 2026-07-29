import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ComplaintDetailsService,
  type BackendComplaint as Complaint,
  type BackendTimelineItem as TimelineEvent,
} from "./complaintDetailsService";

interface Investigator {
  id: string;
  full_name: string;
  email: string;
}

interface ComplaintDetailsState {
  complaint: Complaint | null;
  timeline: TimelineEvent[];
  investigators: Investigator[];
  loading: boolean;
  updatingAssignment: boolean;
  updatingStatus: boolean;
  error: string | null;
}

const initialState: ComplaintDetailsState = {
  complaint: null,
  timeline: [],
  investigators: [],
  loading: false,
  updatingAssignment: false,
  updatingStatus: false,
  error: null,
};

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchComplaintDetail = createAsyncThunk(
  "complaintDetails/fetchComplaint",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ComplaintDetailsService.getComplaint(id);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.detail || e.response?.data?.message || "Failed to load complaint"
      );
    }
  }
);

export const fetchTimeline = createAsyncThunk(
  "complaintDetails/fetchTimeline",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ComplaintDetailsService.getTimeline(id);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.detail || e.response?.data?.message || "Failed to load timeline"
      );
    }
  }
);

export const fetchInvestigators = createAsyncThunk(
  "complaintDetails/fetchInvestigators",
  async (_, { rejectWithValue }) => {
    try {
      return await ComplaintDetailsService.getInvestigators();
    } catch {
      return rejectWithValue("Failed to load investigators");
    }
  }
);

export const assignComplaint = createAsyncThunk(
  "complaintDetails/assign",
  async (
    { id, assignedTo }: { id: string; assignedTo: string },
    { rejectWithValue }
  ) => {
    try {
      return await ComplaintDetailsService.assignComplaint(id, assignedTo);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.detail || e.response?.data?.message || "Assignment failed"
      );
    }
  }
);

export const updateComplaintStatus = createAsyncThunk(
  "complaintDetails/updateStatus",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      return await ComplaintDetailsService.updateStatus(id, status);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.detail || e.response?.data?.message || "Status update failed"
      );
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const complaintDetailsSlice = createSlice({
  name: "complaintDetails",
  initialState,
  reducers: {
    clearComplaintDetails(state) {
      state.complaint = null;
      state.timeline = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // fetchComplaintDetail
      .addCase(fetchComplaintDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaintDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.complaint = action.payload;
      })
      .addCase(fetchComplaintDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTimeline
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.timeline = action.payload;
      })

      // fetchInvestigators
      .addCase(fetchInvestigators.fulfilled, (state, action) => {
        state.investigators = action.payload;
      })

      // assignComplaint
      .addCase(assignComplaint.pending, (state) => {
        state.updatingAssignment = true;
      })
      .addCase(assignComplaint.fulfilled, (state, action) => {
        state.updatingAssignment = false;
        state.complaint = action.payload;
      })
      .addCase(assignComplaint.rejected, (state) => {
        state.updatingAssignment = false;
      })

      // updateComplaintStatus
      .addCase(updateComplaintStatus.pending, (state) => {
        state.updatingStatus = true;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        state.updatingStatus = false;
        state.complaint = action.payload;
      })
      .addCase(updateComplaintStatus.rejected, (state) => {
        state.updatingStatus = false;
      });
  },
});

export const { clearComplaintDetails } = complaintDetailsSlice.actions;
export default complaintDetailsSlice.reducer;

