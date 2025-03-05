import crypto from 'crypto';

import { config } from 'dotenv';
import path from 'path';



// Load env variables from one of multiple possible .env paths
const envPaths = [".env", "../.env", "../../.env", "../../../.env"].map(p =>
  path.resolve(process.cwd(), p)
);
for (const envPath of envPaths) {
  config({ path: envPath });
  if (process.env.SAIGO_SECRET_KEY) break;
}

const algorithm = 'aes-256-cbc';
const secret = process.env.SAIGO_SECRET_KEY;

// Ensure the secret is a Buffer and is 32 bytes long
if (!secret || secret.length !== 32) {
  throw new Error('SAIGO_SECRET_KEY must be a 32-byte string');
}

const iv = crypto.randomBytes(16);

function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Example: Generate an encrypted key
const encryptedKey = encrypt('saigo-no-yume');