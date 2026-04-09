import AppError from "../errors/AppError";
import MessageService from "../services/message";

const getAll = async (req, res, next) => {
  try {
    const messages = await MessageService.getAll(req.context.models);
    return res.send(messages);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const message = await MessageService.getById(
      req.params.messageId,
      req.context.models,
    );

    if (!message) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    return res.send(message);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.text) {
      throw new AppError("O campo 'text' é obrigatório.", 400);
    }

    const message = await MessageService.create(
      req.body.text,
      req.context.me.id,
      req.context.models,
    );

    return res.status(201).send(message);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await MessageService.remove(
      req.params.messageId,
      req.context.models,
    );

    if (!deleted) {
      throw new AppError("Mensagem não encontrada.", 404);
    }

    return res.send({ deleted: true });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, remove };