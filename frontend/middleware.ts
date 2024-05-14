import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JWT_REFRESH_ERROR } from "./consts/errors";

const protectedRoutes = ["/level", "/admin"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedRoutes.includes(pathname)) {
    const AccessToken = req.cookies.get("AccessToken")?.value;
    const RefreshToken = req.cookies.get("RefreshToken")?.value;
    const absoluteURL = new URL("/auth", req.nextUrl.origin);

    if (!AccessToken || !RefreshToken) {
      return NextResponse.redirect(absoluteURL.toString());
    }
    const { BACKEND_URL } = process.env;
    const DecodedAccessToken = fetch(BACKEND_URL + "/api/auth/jwt/decode", {
      method: "POST",
      headers: {
        Cookie: `token=${AccessToken};RefreshToken=${RefreshToken}`,
      },
    });

    return DecodedAccessToken.then((e) => {
      return e.json().then((data) => {
        const { message } = data;
        if (message == JWT_REFRESH_ERROR) {
          return NextResponse.redirect(absoluteURL.toString() + "/auth");
        } else {
          return NextResponse.next();
        }
      });
    });
  }
}
