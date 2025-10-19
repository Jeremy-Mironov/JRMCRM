import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails"; // создадим позже
import Gallery from "./pages/Gallery";
import SignIn from "./pages/SignIn";
import { supabase } from "./supabaseClient";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

export default function MainLayout({ children }) {
  (async () => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      await supabase.auth.signOut();
    }
  })();
  window.addEventListener("beforeunload", async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem("loggedIn");
  });
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
        <main className="flex-1 flex max-w-screen items-center justify-center p-6">
          <div className="min-h-[90vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">
            <Sidebar />
            {children}
          </div>
        </main>
      </div></ProtectedRoute>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>



    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout>
          <Dashboard />
        </MainLayout>} />

        <Route path="/Projects" element={<MainLayout>
          <Projects />
        </MainLayout>} />

        <Route path="/Gallery" element={<MainLayout>
          <Gallery />
        </MainLayout>} />

        <Route path="/Projects/:slug" element={<MainLayout>
          <ProjectDetails />
        </MainLayout>} />

        <Route path="/SignIn" element={<SignIn />} />

      </Routes>
    </BrowserRouter>


  </React.StrictMode>
);
