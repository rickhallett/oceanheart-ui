import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  console.log("🔑 Key route called");
  const algorithm = "aes-256-cbc";
  const secret = process.env.SAIGO_SECRET_KEY;

  console.log("🔑 Secret key:", secret);

  function decrypt(encryptedText: string) {
    const [ivHex, encryptedData] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedBuffer = Buffer.from(encryptedData, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
    const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    return decrypted.toString();
  }

  const { hiddenKeyParam } = await req.json();

  if (!hiddenKeyParam) {
    return NextResponse.json({}, { status: 200 }) // give away nothing
  }

  let decryptedKey: string;
  try {
    decryptedKey = decrypt(hiddenKeyParam);
  } catch (error) {
    return NextResponse.json({}, { status: 200 }) // give away nothing
  }

  console.log("🔑 Decrypted key:", decryptedKey);
  if (decryptedKey === process.env.SAIGO_SECRET_KEY_ORIGIN) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 200 }) // give away nothing
  }
}