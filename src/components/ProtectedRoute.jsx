import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                window.location.href = "/signin";
            } else {
                setUser(data.session.user);
            }
            setLoading(false);
        };
        checkSession();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return children;
}
