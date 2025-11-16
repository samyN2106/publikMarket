import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: 200 });

  response.cookies.set({
    name: "myapp_session",
    value: "", // valeur vide
    path: "/",
    maxAge: 0, // expire immédiatement
  });

  return response;
}
