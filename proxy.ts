import { jwtDecode } from "jwt-decode"
import { type NextRequest, NextResponse } from "next/server"

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/create-account", whenAuthenticated: "redirect" },
] as const

const REDIRECT_WHEN_NOT_AUTH = "/login"

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)
  const token = request.cookies.get("access_token")

  if (publicRoute && !token) {
    return NextResponse.next()
  }

  if (!publicRoute && !token) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH
    return NextResponse.redirect(redirectUrl)
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ exp: number }>(token.value)
      const isExpired = decoded.exp < Date.now() / 1000

      if (isExpired) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH
        const response = NextResponse.redirect(redirectUrl)
        response.cookies.delete("access_token")
        return response
      }

      if (publicRoute?.whenAuthenticated === "redirect") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (e) {
      console.error(e)
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH

      const response = NextResponse.redirect(redirectUrl)
      response.cookies.delete("access_token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\..*).*)"],
}
