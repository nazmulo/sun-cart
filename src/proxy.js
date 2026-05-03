import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

export async function proxy(request) {
    const { data: session } = await betterFetch(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                // get the cookie from the request
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    const isProtectedProduct = request.nextUrl.pathname.startsWith("/products/") && request.nextUrl.pathname !== "/products";
    const isProtectedProfile = request.nextUrl.pathname.startsWith("/profile");

    if (!session && (isProtectedProduct || isProtectedProfile)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/products/:path*", "/profile/:path*"],
};
