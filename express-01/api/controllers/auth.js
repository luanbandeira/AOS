import * as AuthService from "../services/auth";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.register(
      { username, email, password },
      req.context.models
    );

    return res.status(201).json({
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login(
      { login, password },
      req.context.models
    );

    return res.json({
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token obrigatório." });
    }

    const { accessToken } = await AuthService.refresh(
      refreshToken,
      req.context.models
    );

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await AuthService.logout(refreshToken, req.context.models);
    return res.status(204).send(); // sem corpo
  } catch (err) {
    next(err);
  }
};

export default { register, login, refresh, logout };