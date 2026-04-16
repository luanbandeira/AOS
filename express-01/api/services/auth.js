import AppError from "../errors/AppError";
import { generateAccessToken, generateRefreshToken } from "./token";

// Registrar usuário
export const register = async ({ username, email, password }, models) => {
  const existing = await models.User.findOne({ where: { email } });
  if (existing) throw new AppError("E-mail já cadastrado.", 409);

  const user = await models.User.create({ username, email, password });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id, models);

  return { user, accessToken, refreshToken };
};

// Login
export const login = async ({ login, password }, models) => {
  const user = await models.User.findByLogin(login);
  if (!user) throw new AppError("Credenciais inválidas.", 401);

  const isValid = await user.validatePassword(password);
  if (!isValid) throw new AppError("Credenciais inválidas.", 401);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id, models);

  return { user, accessToken, refreshToken };
};

// Renovar access token usando o refresh token
export const refresh = async (token, models) => {
  const record = await models.RefreshToken.findOne({ where: { token } });

  if (!record) throw new AppError("Refresh token inválido.", 401);
  if (record.isExpired()) {
    await record.destroy();
    throw new AppError("Refresh token expirado. Faça login novamente.", 401);
  }

  const newAccessToken = generateAccessToken(record.userId);
  return { accessToken: newAccessToken };
};

// Logout — invalida o refresh token no banco
export const logout = async (token, models) => {
  await models.RefreshToken.destroy({ where: { token } });
};