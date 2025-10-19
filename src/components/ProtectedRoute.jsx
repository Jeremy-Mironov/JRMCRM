import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data?.session;
            const loggedIn = sessionStorage.getItem("loggedIn");

            // ❌ Если нет сессии или нет флага loggedIn — на страницу входа
            if (!session || !loggedIn) {
                sessionStorage.removeItem("loggedIn");
                supabase.auth.signOut();


                window.location.replace("/signin");


                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.location.replace("/signin");
                };
            } else {
                setUser(session.user);
            }

            setLoading(false);
        };

        checkSession();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return children;
}
