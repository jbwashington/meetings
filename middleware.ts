export { auth as middeware } from './auth'

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/editor/:path*",
        "/login",
        "/register",
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};