import AppError from "../errors/AppError";
import { verifyAccessToken } from "../services/token";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Token não fornecido.", 401);
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const decoded = verifyAccessToken(token); // lança erro se inválido

    // Injeta o userId no request para os próximos handlers usarem
    req.userId = decoded.userId;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Access token expirado.", 401));
    }
    if (err.name === "JsonWebTokenError") {
      return next(new AppError("Token inválido.", 401));
    }
    next(err);
  }
};

export default authenticate;