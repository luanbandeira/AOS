import AppError from "../errors/AppError";
import UserService from "../services/user";

const getAll = async (req, res, next) => {
  try {
    const users = await UserService.getAll(req.context.models);
    return res.send(users);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await UserService.getById(
      req.params.userId,
      req.context.models,
    );

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById };