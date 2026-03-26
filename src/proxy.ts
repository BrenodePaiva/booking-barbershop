import { getUserRoles } from "@/actions/role/get-user-roles";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = async (req: NextRequest) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const roles = await getUserRoles(session.user.id);

  //  const pathname = req.nextUrl.pathname;

  if (roles.includes("admin")) {
    return NextResponse.next();
  } else if (roles.includes("cliente")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!roles.includes("admin") || !roles.includes("gerente")) {
    return NextResponse.redirect(new URL("/booking-list", req.url));
  }
};

export const config = {
  matcher: [
    "/barber-list/:path*",
    "/barbershop-service/:path*",
    "/booking-list/:path*",
    "/dashboard/:path*",
    "/user-list/:path*",
  ],
};
