import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCurrentUser } from "@/features/auth/authSlice";
import RouterProvider from "./routes";
import { Activity } from "lucide-react";

export default function App() {
  const dispatch = useAppDispatch();
  const { loading, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  // Show a premium loading screen on initial profile fetch
  if (loading && token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-200">
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30 animate-pulse">
            <Activity className="h-8 w-8 text-white animate-spin [animation-duration:3s]" />
          </div>
          <p className="text-sm font-semibold tracking-wider uppercase text-slate-400">
            Initializing Session...
          </p>
        </div>
      </div>
    );
  }

  return <RouterProvider />;
}