import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/features/ui/uiSlice";
import authReducer from "@/features/auth/authSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import complaintReducer from "@/features/complaints/complaintSlice";
import complaintDetailsReducer from "@/features/complaints/complaintDetailsSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        complaints: complaintReducer,
        complaintDetails: complaintDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;