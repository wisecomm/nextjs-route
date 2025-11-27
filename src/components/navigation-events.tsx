"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log("Navigation event:", url);
        // You can add more logic here, e.g., analytics tracking
    }, [pathname, searchParams]);

    return null;
}
