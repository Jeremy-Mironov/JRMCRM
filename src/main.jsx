import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails"; // создадим позже
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Sidebar />


      <main className="flex-1 flex max-w-screen items-center justify-center p-6">
        <div className="min-h-[100vh] top-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl p-6 lg:ml-72">



          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/Projects/:slug" element={<ProjectDetails />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
    </div>

  </React.StrictMode>
);
