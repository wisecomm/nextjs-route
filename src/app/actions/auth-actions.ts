"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/app/api/[...path]/route";

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

        if (!response.ok) {
            return { success: false, message: '로그인 실패' };
        }

        const data = await response.json();

        // API 응답 구조에 맞게 수정 필요 (예: data.accessToken, data.refreshToken)
        const { accessToken, refreshToken } = data;

        if (!accessToken || !refreshToken) {
            return { success: false, message: '토큰을 받아오지 못했습니다.' };
        }

        await createSession(accessToken, refreshToken);

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: '서버 에러가 발생했습니다.' };
    }
}
