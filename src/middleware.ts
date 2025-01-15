import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("middleware pathname= " + pathname);

  /*
  const accessToken = request.cookies.get("accessToken")?.value;

  // accessToken = "1234";
  //accessToken = null;

  const publicPaths = ["/", "/login", "/sign-up"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isFile = request.nextUrl.pathname.match(/\.(.*)$/);

  if (isFile) {
    return NextResponse.next();
  }

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
*/

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
