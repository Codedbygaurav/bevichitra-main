import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET;

if (!SECRET) {
  throw new Error("❌ AUTH_SECRET is required");
}

// ✅ create signature
export function sign(value) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(value)
    .digest("hex");
}

// ✅ secure compare (prevents timing attacks)
export function verify(value, signature) {
  const expected = sign(value);

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}