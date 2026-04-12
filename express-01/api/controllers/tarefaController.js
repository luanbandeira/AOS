import AppError from "../errors/AppError";
import TarefaService from "../services/tarefaService";

const getAll = async (req, res, next) => {
  try {
    const tarefas = await TarefaService.getAll(req.context.models);
    return res.send(tarefas);
  } catch (err) {
    next(err);
  }
};

const getByObjectId = async (req, res, next) => {
  try {
    const tarefa = await TarefaService.getByObjectId(
      req.params.objectId,
      req.context.models,
    );

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.send(tarefa);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.descricao) {
      throw new AppError("O campo 'descricao' é obrigatório.", 400);
    }

    const tarefa = await TarefaService.create(
      req.body.descricao,
      req.body.concluida,
      req.context.models,
    );

    return res.status(201).send(tarefa);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const tarefa = await TarefaService.update(
      req.params.objectId,
      req.body,
      req.context.models,
    );

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.send(tarefa);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await TarefaService.remove(
      req.params.objectId,
      req.context.models,
    );

    if (!deleted) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.send({ message: "Tarefa removida com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getByObjectId, create, update, remove };