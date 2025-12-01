import { NextRequest, NextResponse } from 'next/server';

import { deleteSession, getTokens, createSession } from '@/app/actions/auth-actions';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';



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

        // 응답 헤더 필터링 (Content-Length, Content-Encoding 등 제외)
        const responseHeaders = new Headers();
        response.headers.forEach((value, key) => {
            const lowerKey = key.toLowerCase();
            if (!['content-length', 'content-encoding', 'transfer-encoding', 'connection'].includes(lowerKey)) {
                responseHeaders.set(key, value);
            }
        });

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { code: '500', message: 'Internal Server Error', data: null },
            { status: 500 }
        );
    }
}

async function handleTokenRefresh(originalRequest: NextRequest, path: string) {
    const { refreshToken } = await getTokens();

    if (!refreshToken) {
        return NextResponse.json({ code: '401', message: 'Unauthorized', data: null }, { status: 401 });
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
        await createSession(newAccessToken, newRefreshToken || refreshToken);

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

        const retryResponseHeaders = new Headers();
        retryResponse.headers.forEach((value, key) => {
            const lowerKey = key.toLowerCase();
            if (!['content-length', 'content-encoding', 'transfer-encoding', 'connection'].includes(lowerKey)) {
                retryResponseHeaders.set(key, value);
            }
        });

        return new NextResponse(retryResponse.body, {
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: retryResponseHeaders,
        });

    } catch (error) {
        console.error('Token Refresh Error:', error);
        // 리프레시 실패 시 쿠키 삭제 및 401 반환
        await deleteSession();
        return NextResponse.json({ code: '401', message: 'Session expired', data: null }, { status: 401 });
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
