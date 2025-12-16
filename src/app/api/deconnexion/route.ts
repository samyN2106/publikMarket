import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ message: "Déconnecté" });

  response.cookies.set({
    name: "myapp_session",
    value: "", // valeur vide
    path: "/",
    maxAge: 0, // expire immédiatement
  });

  return response;
}
