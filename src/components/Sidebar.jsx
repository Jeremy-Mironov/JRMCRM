import React, { useState, useEffect } from "react"; // добавили useEffect
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    RectangleStackIcon,
    InboxIcon,
    UsersIcon,
    FolderIcon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon,
    BriefcaseIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../supabaseClient";

const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/" },
    { name: "Gallery", icon: RectangleStackIcon, href: "/Gallery" },
    { name: "Inbox", icon: InboxIcon, href: "#", count: 3 },
    { name: "Users", icon: UsersIcon, href: "#" },
    { name: "Projects", icon: FolderIcon, href: "/Projects" },
    { name: "Settings", icon: Cog6ToothIcon, href: "#" },
    { name: "Upgrade to Pro", icon: BriefcaseIcon, href: "#" },
    { name: "Help", icon: QuestionMarkCircleIcon, href: "#" },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null); // добавили состояние пользователя

    // 🔹 отслеживание сессии и изменений авторизации
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) console.error("supabase.getSession error:", error);
                else if (mounted) setUser(data?.session?.user ?? null);
            } catch (err) {
                console.error("getSession failed:", err);
            }
        })();

        // подписка
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth change:", _event);
            setUser(session?.user ?? null);
        });

        // безопасная отписка
        return () => {
            mounted = false;
            try {
                // проверяем все возможные формы
                listener?.subscription?.unsubscribe?.();
                listener?.unsubscribe?.(); // если supabase 2.x
            } catch (err) {
                console.warn("Listener cleanup error:", err);
            }
        };
    }, []);


    const handleAuthClick = async () => {
        window.location.href = "/signin";
    };

    return (
        <>
            {/* 🔘 Кнопка гамбургер */}
            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
            >
                {open ? (
                    <XMarkIcon className="w-6 h-6" />
                ) : (
                    <Bars3Icon className="w-6 h-6" />
                )}
            </button>

            {/* 📋 Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 `}
            >
                <div className="h-full px-3 py-4 lg:mt-1 overflow-y-auto mt-12 lg:mt-0">
                    <ul className="space-y-2 font-medium ">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    onClick={() => setOpen(false)}
                                >
                                    <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        {item.name}
                                    </span>
                                    {item.count && (
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                            {item.count}
                                        </span>
                                    )}
                                </a>
                            </li>
                        ))}
                        {/* 🔹 кнопка вход/выход */}
                        <li>
                            <button
                                onClick={handleAuthClick}
                                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {user ? <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />}

                                <span className="flex-1 ms-3 whitespace-nowrap text-left">
                                    {user ? "Sign Out" : "Sign In"}
                                </span>
                            </button>
                            <p className="text-white p-7 text-left">{user ? user.email : ""} </p>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
