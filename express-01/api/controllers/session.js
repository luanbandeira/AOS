import AppError from "../errors/AppError";

const getMe = async (req, res, next) => {
  try {
    const user = await req.context.models.User.findByPk(req.context.me.id);

    if (!user) {
      throw new AppError("Sessão inválida.", 404);
    }

    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export default { getMe };