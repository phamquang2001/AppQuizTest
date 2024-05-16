import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./utils/cookie";
import { getListAssessment } from "./api/apiHr";

export async function middleware(request: NextRequest) {
  console.log("a")
  const tokenIsValid = await validateToken(); 
  if (tokenIsValid) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("http://localhost:3000"));
  }
}

async function validateToken() {
  const res: any = getListAssessment(2);
  console.log(res);
  if (res) {
    return true;
  } else {
    return false;
  }
}

export const config = {
  matcher: ["/hrpages/:path*"],
};
