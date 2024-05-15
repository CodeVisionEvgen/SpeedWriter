import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JWT_EXPIRED_ERROR, JWT_REFRESH_ERROR } from "./consts/errors";

const protectedRoutes = ["/level", "/admin", "/test"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedRoutes.includes(pathname)) {
    const AccessToken = req.cookies.get("AccessToken")?.value;
    const RefreshToken = req.cookies.get("RefreshToken")?.value;
    const absoluteURL = new URL("/", req.nextUrl.origin);

    if (!AccessToken || !RefreshToken) {
      return NextResponse.redirect(absoluteURL.toString());
    }
    const { BACKEND_URL } = process.env;
    const VerifyAccessToken = fetch(BACKEND_URL + "/api/auth/verify", {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `AccessToken=${AccessToken};`,
      },
    });
    return VerifyAccessToken.then(async (res) => {
      const data = await res.json();
      const { message } = data;
      if (message === JWT_EXPIRED_ERROR) {
        const tokens = await fetch(BACKEND_URL + "/api/auth/refresh", {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: `RefreshToken=${RefreshToken};`,
          },
        });
        const body = await tokens.json();
        const next = NextResponse.next();
        next.cookies
          .set("AccessToken", body.accessToken)
          .set("RefreshToken", body.refreshToken);
        return next;
      } else {
        return NextResponse.next();
      }
    });
    // return VerifyAccessToken.then((e) => {
    //   return e.json().then(async (data) => {
    //     const { message } = data;
    //     if (message == JWT_REFRESH_ERROR) {
    //     console.log(data);
    //     const tokens = await fetch(BACKEND_URL + "/api/auth/refresh", {
    //       method: "POST",
    //       credentials: "include",
    //       headers: {},
    //     });
    //     console.log(tokens.body);
    //     setCookie("AccessToken", tokens.AccessToken);
    //     setCookie("RefreshToken", tokens.RefreshToken);
    //     return NextResponse.redirect(absoluteURL.toString() + "/auth");
    //     } else {
    //     return NextResponse.next();
    //     }
    //   });
    // });
  }
}
