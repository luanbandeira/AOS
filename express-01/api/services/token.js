import jwt from "jsonwebtoken";
import crypto from "crypto"; // nativo do Node

// Gera o ACCESS TOKEN (JWT curto, stateless)
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES } // ex: "15m"
  );
};

// Verifica e decodifica o ACCESS TOKEN
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  // Lança JsonWebTokenError ou TokenExpiredError se inválido
};

// Gera o REFRESH TOKEN (opaque — string aleatória, salva no banco)
export const generateRefreshToken = async (userId, models) => {
  const token = crypto.randomBytes(64).toString("hex"); // string aleatória

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // expira em 7 dias

  await models.RefreshToken.create({ token, expiresAt, userId });

  return token;
};