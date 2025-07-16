'use client';

import { useEffect } from "react";

export default function LogoutPage() {
    useEffect(() => {
        const logout = async () => {
            await fetch ("/api/logout", {
                method: "POST",
                credentials: "include",
            });
            setTimeout(() => {
                window.location.href = "/login";
            }, 10000);
        };
        logout();
    }, []);
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600">
                Logging out...
            </p>
        </div>
    );
}