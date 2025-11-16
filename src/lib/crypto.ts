import crypto from "crypto";

// Algorithme de chiffrement AES
const algorithm = "aes-256-cbc";

// La clé secrète (32 octets = 256 bits)
const secretKeyHex =
  process.env.SESSION_SECRET ||
  "acf15f3b508413837815aaeb74009e7264298178a09f6309386855f8b23e45d6";

// On convertit la clé hexadécimale en Buffer binaire
const secretKey = Buffer.from(secretKeyHex, "hex");

// Taille du vecteur d’initialisation (IV)
const ivLength = 16;

/**
 * Chiffre un texte (par ex. l'ID utilisateur)
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // On retourne l’IV et le texte chiffré ensemble
  return `${iv.toString("hex")}:${encrypted}`;
}

/**
 * Déchiffre un texte chiffré (récupère l’ID utilisateur)
 */
export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
