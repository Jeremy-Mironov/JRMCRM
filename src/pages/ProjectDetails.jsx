import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

export const ProjectDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { projectsData, loading } = useProjects();

    if (loading) return <div>Loading...</div>;


    const project = projectsData.find(
        (p) =>
            p.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") === slug
    );

    if (!project) {
        return (
            <div className="text-center mt-10 text-gray-700 dark:text-gray-300">
                <p>❌ Project not found.</p>
                <button
                    onClick={() => navigate("/Projects")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    ← Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-10 px-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                    {project.name}
                </h1>

                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium">Manager:</span> {project.manager}</p>
                    <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${project.status === "Completed"
                                ? "border-green-700 text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300"
                                : project.status === "Pending"
                                    ? "border-yellow-700 text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "border-blue-700 text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
                                }`}
                        >
                            {project.status}
                        </span>
                    </p>
                    <p><span className="font-medium">Budget:</span> ${project.budget}</p>
                    <p><span className="font-medium">Start Date:</span> {project.startDate}</p>
                    <p><span className="font-medium">Deadline:</span> {project.deadline}</p>
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={() => navigate("/Projects")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        </div>
    );
};
