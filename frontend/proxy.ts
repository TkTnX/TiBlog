import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const SECRET = process.env.JWT_SECRET || "secret1"

export function proxy(request: NextRequest) {
	const token = request.cookies.get("accessToken")
	let payload: { role: string } | null = null

	if (token) {
		payload = jwt.verify(token?.value, SECRET) as { role: string }
	}
	if (
		request.nextUrl.pathname.startsWith("/admin") &&
		(payload?.role !== "ADMIN" || !token)
	) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	if (request.nextUrl.pathname.startsWith("/auth/") && token) {
		return NextResponse.redirect(new URL("/", request.url))
	}
}

export const config = {
	matcher: ["/auth/:path*", "/admin", "/admin/:path*"]
}
