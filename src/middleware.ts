import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("middleware pathname= " + pathname);
  let accessToken = request.cookies.get("accessToken")?.value;

  accessToken = "1234";

  // 로그인 된 사용자가 로그인 페이지 요청 시 / 페이지로 강제 리다이렉트
  if (accessToken && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 미완료된 사용자가 일반 페이지 요청 시 로그인 페이지로 강제 리다이렉트
  if (!accessToken && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  /*  
  if (pathname.startsWith("/about")) {
    //    return NextResponse.redirect(new URL("/aa", request.url));
    return NextResponse.rewrite(new URL("/aa", request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 목록들로 시작되는 경로를 미들웨어 체크에서 제외하기:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - server/ (네트워크 요청 경로)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|server).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
