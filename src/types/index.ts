export interface ButtonConfig {
    id: string;
    name: string;
    roles: string[];
}

export interface Menu {
    id: string;
    sortId?: string;
    name: string;
    parentId: string | null;
    path: string;
    roles: string[];
    buttons: ButtonConfig[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "viewer";
    status: "active" | "pending" | "inactive";
    lastLogin: string;
}

export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T;
}
