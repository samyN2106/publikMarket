import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  // Configurer ton transport SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Vérification de la connexion SMTP
  transporter.verify((error, success) => {
    if (error) {
      console.error("Erreur de connexion SMTP :", error);
    } else {
      console.log("Connexion SMTP réussie :", success);
    }
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
  } catch (error: any) {
    console.error("Erreur SMTP :", error.message);
    // Tu peux aussi logguer dans Supabase ou ignorer
  }

  return NextResponse.json({ success: true });
}
