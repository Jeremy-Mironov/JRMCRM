import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails"; // создадим позже
import { Gallery } from "./pages/Gallery";
import SignIn from "./pages/SignIn";
import { supabase } from "./supabaseClient";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>



    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
          <main className="flex-1 flex max-w-screen items-center justify-center p-6">
            <div className="min-h-[100vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">
              <Sidebar /><Dashboard />
            </div>
          </main>
        </div> </ProtectedRoute>} />


        <Route path="/Projects" element={<ProtectedRoute>    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
          <main className="flex-1 flex max-w-screen items-center justify-center p-6">
            <div className="min-h-[100vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">
              <Sidebar /><Projects />
            </div>
          </main>
        </div> </ProtectedRoute>} />

        <Route path="/Gallery" element={<ProtectedRoute>    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
          <main className="flex-1 flex max-w-screen items-center justify-center p-6">
            <div className="min-h-[100vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">
              <Sidebar /><Gallery />
            </div>
          </main>
        </div> </ProtectedRoute>} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Projects/:slug" element={<ProtectedRoute>    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
          <main className="flex-1 flex max-w-screen items-center justify-center p-6">
            <div className="min-h-[100vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">
              <Sidebar /><ProjectDetails />
            </div>
          </main>
        </div> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>


  </React.StrictMode>
);
