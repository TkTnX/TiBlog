import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
	const token = request.cookies.get("accessToken")
	if (request.nextUrl.pathname.startsWith("/auth/") && token) {
		return NextResponse.redirect(new URL("/", request.url))
	}
}

export const config = {
	matcher: "/auth/:path*"
}
