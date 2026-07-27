import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import { ROUTES } from "@/constants/routes";

import DashboardPage from "@/pages/Dashboard";
import ComplaintInventoryPage from "@/pages/ComplaintInventory";
import ComplaintFormPage from "@/pages/ComplaintForm";
import ComplaintDetailsPage from "@/pages/ComplaintDetails";
import AnalyticsPage from "@/pages/Analytics";
import CapaPage from "@/pages/Capa";
import SettingsPage from "@/pages/Settings";
import NotFoundPage from "@/pages/NotFound";

export default function RouterProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
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