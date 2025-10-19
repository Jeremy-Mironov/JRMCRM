import React, { useState } from "react";
import DataTable from "../components/DataTable";
import { useProjects } from "../hooks/useProjects";
import { supabase } from "../supabaseClient";


const projectColumns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Manager", key: "manager" },
    { label: "Status", key: "status" },
    { label: "Budget", key: "budget" },
    { label: "Start Date", key: "start_date" },
    { label: "Deadline", key: "deadline" },
];


export const Projects = () => {
    const { projectsData, loading } = useProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        manager: "",
        status: "Active",
        budget: "",
        start_date: "",
        deadline: "",
    });

    if (loading) return <div>Loading...</div>;

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase
                .from("projects")
                .insert([newProject]);

            if (error) throw error;

            console.log("✅ Added new project:", data);

            setIsModalOpen(false);
            setNewProject({
                name: "",
                manager: "",
                status: "Active",
                budget: "",
                start_date: "",
                deadline: "",
            });

            window.location.reload(); // временно, пока нет live update
        } catch (err) {
            console.error("❌ Error adding project:", err.message);
            alert("Error adding project: " + err.message);
        }
    };

    return (


        <>

            <h1 className="text-center text-gray-800 dark:text-white mb-6 ">
                Projects
            </h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 my-5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                + Add Project
            </button>
            <div className="w-full max-w-[400px] sm:max-w-3xl bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">



                <DataTable columns={projectColumns} data={projectsData} />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md text-gray-800 dark:text-white">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Add New Project
                        </h2>

                        <form onSubmit={handleAdd} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Project name"
                                className="w-full border rounded px-3 py-2"
                                value={newProject.name}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, name: e.target.value })
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder="Manager"
                                className="w-full border rounded px-3 py-2"
                                value={newProject.manager}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, manager: e.target.value })
                                }
                                required
                            />
                            <select
                                className="w-full  border rounded px-3 py-2"
                                value={newProject.status}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, status: e.target.value })
                                }
                            >
                                <option className="bg-black">Active</option>
                                <option className="bg-black">Pending</option>
                                <option className="bg-black">Completed</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Budget"
                                className="w-full border rounded px-3 py-2"
                                value={newProject.budget}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, budget: e.target.value })
                                }
                                required
                            />
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={newProject.start_date}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, start_date: e.target.value })
                                }
                                required
                            />
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={newProject.deadline}
                                onChange={(e) =>
                                    setNewProject({ ...newProject, deadline: e.target.value })
                                }
                                required
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>

    );
}