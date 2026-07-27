import { Routes,Route } from "react-router-dom";

import DashboardPage from "@/pages/DashboardPage";

import ComplaintListPage from "@/pages/ComplaintListPage";

import ComplaintFormPage from "@/pages/ComplaintFormPage";

import ComplaintDetailsPage from "@/pages/ComplaintDetailsPage";

import NotFoundPage from "@/pages/NotFoundPage";

import AppLayout from "@/layouts/AppLayout";

export default function AppRoutes(){

    return(

        <Routes>

            <Route element={<AppLayout/>}>

                <Route path="/" element={<DashboardPage/>}/>

                <Route path="/complaints" element={<ComplaintListPage/>}/>

                <Route path="/complaints/new" element={<ComplaintFormPage/>}/>

                <Route path="/complaints/:id" element={<ComplaintDetailsPage/>}/>

            </Route>

            <Route path="*" element={<NotFoundPage/>}/>

        </Routes>

    )

}