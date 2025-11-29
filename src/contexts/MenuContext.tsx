"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "@/types";
import { api } from "@/app/api/axiosClient";

interface MenuContextType {
    menus: Menu[];
    currentMenu: Menu | null;
    loading: boolean;
    error: string | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                // Assuming there is an API endpoint to fetch menus
                // You might need to adjust the endpoint URL
                const response = await api.get<Menu[]>("/menus");

                // Check if response is wrapped in ApiResponse or is direct array
                // Based on previous axiosClient changes, api.get returns ApiResponse<T>
                if (response.code === '200' && response.data) {
                    setMenus(response.data);
                } else {
                    // Fallback or error handling if structure doesn't match
                    console.error("Failed to fetch menus:", response.message);
                    setError(response.message || "Failed to fetch menus");
                }

            } catch (err) {
                console.error("Error fetching menus:", err);
                setError("Error fetching menus");
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    // Find current menu based on pathname
    // This is a simple matching logic, might need refinement for nested routes
    const currentMenu = menus.find((menu) => menu.path === pathname) || null;

    return (
        <MenuContext.Provider value={{ menus, currentMenu, loading, error }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
}
