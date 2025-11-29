"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "@/app/api/[...path]/route";
import { ApiResponse } from "@/types";

export async function createSession(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    // Access Token: 1 hour expiration (example)
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60, // 1 hour
        sameSite: 'lax',
    });

    // Refresh Token: 7 days expiration (example)
    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}

export async function getTokens() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    return { accessToken, refreshToken };
}


interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}

async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: ApiResponse<T> = await response.json();
    return responseData;
}

export async function login(formData: FormData) {
    const userid = formData.get('userid');
    const password = formData.get('password');

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid, password }),
        });

        const apiResponse = await handleApiResponse<LoginResponseData>(response);

        if (apiResponse.code === '200' && apiResponse.data) {
            const { accessToken, refreshToken } = apiResponse.data;
            if (accessToken && refreshToken) {
                await createSession(accessToken, refreshToken);
            }
        }

        return apiResponse;
    } catch (error) {
        console.error('Login error:', error);

        const message = error instanceof Error ? error.message : '서버 에러가 발생했습니다.';
        return { code: '500', message, data: null };
    }
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
