import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import { ROUTES } from "@/constants/routes";

import LoginPage from "@/pages/Login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ComplaintInventoryPage from "@/pages/ComplaintInventory/ComplaintInventoryPage";
import ComplaintFormPage from "@/pages/ComplaintForm/ComplaintFormPage";
import ComplaintDetailsPage from "@/pages/ComplaintDetails/ComplaintDetailsPage";
import AnalyticsPage from "@/pages/Analytics/AnalyticsPage";
import CapaPage from "@/pages/Capa/CapaPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

export default function RouterProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={<LoginPage />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={<DashboardPage />}
                    />

                    <Route
                        path={ROUTES.COMPLAINTS}
                        element={<ComplaintInventoryPage />}
                    />

                    <Route
                        path={ROUTES.NEW_COMPLAINT}
                        element={<ComplaintFormPage />}
                    />

                    <Route
                        path={ROUTES.DETAILS}
                        element={<ComplaintDetailsPage />}
                    />

                    <Route
                        path={ROUTES.ANALYTICS}
                        element={<AnalyticsPage />}
                    />

                    <Route
                        path={ROUTES.CAPA}
                        element={<CapaPage />}
                    />

                    <Route
                        path={ROUTES.SETTINGS}
                        element={<SettingsPage />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}