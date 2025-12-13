import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  // Configurer ton transport SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou smtp.office365.com, etc.
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Contenu du mail
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Bienvenue sur PublikMarket 🎉",
    text: `Bonjour ${name},\n\nMerci d'avoir créé un compte !`,
    html: `  <div style="text-align:center;">
      <img src="https://publik-market.vercel.app/favicon.ico" alt="Logo" width="120" />
      <h1>Bienvenue ${name} 👋</h1>
      <p>Merci d'avoir créé un compte sur PublikMarket.</p>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
