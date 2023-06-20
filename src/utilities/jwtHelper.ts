import jwt from "jsonwebtoken";

// Sign and Verify
type payload = {
  name?: string;
  email?: string;
};
export function sign(payload: payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "100d" });
}

export function verify(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY);
}
