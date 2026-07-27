import { NavLink } from "react-router-dom";

import { LayoutDashboard,FileText,Plus } from "lucide-react";

export default function Sidebar(){

    return(

        <aside className="w-64 bg-slate-900 text-white">

            <div className="border-b border-slate-700 p-6">

                <h1 className="text-xl font-bold">

                    AIVOA QMS

                </h1>

            </div>

            <nav className="space-y-2 p-4">

                <NavLink
                    to="/"
                    className="flex items-center gap-2 rounded p-3 hover:bg-slate-700"
                >

                    <LayoutDashboard size={18}/>

                    Dashboard

                </NavLink>

                <NavLink
                    to="/complaints"
                    className="flex items-center gap-2 rounded p-3 hover:bg-slate-700"
                >

                    <FileText size={18}/>

                    Complaints

                </NavLink>

                <NavLink
                    to="/complaints/new"
                    className="flex items-center gap-2 rounded p-3 hover:bg-slate-700"
                >

                    <Plus size={18}/>

                    Log Complaint

                </NavLink>

            </nav>

        </aside>

    )

}
