import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const useProjects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase.from("projects").select("*");
            if (error) console.error(error);
            else setProjectsData(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return { projectsData, loading };
};
