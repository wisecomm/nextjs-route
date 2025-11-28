import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function getTokens() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    return { accessToken, refreshToken };
}

async function proxyRequest(request: NextRequest, path: string) {
    const { accessToken } = await getTokens();

    // 1. 요청 URL 재구성
    const targetUrl = `${API_URL}/${path}${request.nextUrl.search}`;
    console.log(`[Proxy] Forwarding to: ${targetUrl}`);

    // 2. 헤더 설정
    const headers = new Headers(request.headers);
    headers.delete('host'); // 호스트 헤더 제거 (백엔드 서버가 처리하도록)
    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // 3. 요청 본문 처리
    const body = request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.blob()
        : undefined;

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body,
            cache: 'no-store', // API 요청은 캐시하지 않음
        });

        // 4. 토큰 만료 처리 (401)
        if (response.status === 401) {
            return await handleTokenRefresh(request, path);
        }

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

async function handleTokenRefresh(originalRequest: NextRequest, path: string) {
    const { refreshToken } = await getTokens();

    if (!refreshToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. 토큰 갱신 요청
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
            throw new Error('Refresh failed');
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshResponse.json();

        // 2. 쿠키 갱신
        const cookieStore = await cookies();
        cookieStore.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60,
            sameSite: 'lax',
        });

        if (newRefreshToken) {
            cookieStore.set('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'lax',
            });
        }

        // 3. 원래 요청 재시도
        const targetUrl = `${API_URL}/${path}${originalRequest.nextUrl.search}`;
        const headers = new Headers(originalRequest.headers);
        headers.delete('host');
        headers.set('Authorization', `Bearer ${newAccessToken}`);

        const body = originalRequest.method !== 'GET' && originalRequest.method !== 'HEAD'
            ? await originalRequest.blob()
            : undefined;

        const retryResponse = await fetch(targetUrl, {
            method: originalRequest.method,
            headers,
            body,
            cache: 'no-store',
        });

        return new NextResponse(retryResponse.body, {
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: retryResponse.headers,
        });

    } catch (error) {
        console.error('Token Refresh Error:', error);
        // 리프레시 실패 시 쿠키 삭제 및 401 반환
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        return NextResponse.json({ message: 'Session expired' }, { status: 401 });
    }
}

// 모든 HTTP 메서드에 대해 핸들러 적용
export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join('/'));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join('/'));
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join('/'));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join('/'));
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    return proxyRequest(request, path.join('/'));
}
