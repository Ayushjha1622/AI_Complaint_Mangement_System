import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    sidebarCollapsed: boolean;
    sidebarOpen: boolean;
    theme: "light" | "dark";
}

const initialState: UIState = {
    sidebarCollapsed: false,
    sidebarOpen: false,
    theme: "light",
};

const uiSlice = createSlice({
    name: "ui",

    initialState,

    reducers: {
        toggleSidebar(state) {
            state.sidebarCollapsed =
                !state.sidebarCollapsed;
        },

        toggleMobileSidebar(state) {
            state.sidebarOpen =
                !state.sidebarOpen;
        },

        closeMobileSidebar(state) {
            state.sidebarOpen = false;
        },

        toggleTheme(state) {
            state.theme =
                state.theme === "light"
                    ? "dark"
                    : "light";
        },
    },
});

export const {
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;