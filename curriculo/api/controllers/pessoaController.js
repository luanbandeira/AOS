import AppError from "../errors/AppError";
import PessoaService from "../services/pessoaService";

const getAll = async (req, res, next) => {
  try {
    const pessoas = await PessoaService.getAll(req.context.models);
    return res.send(pessoas);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const pessoa = await PessoaService.getById(
      req.params.id,
      req.context.models,
    );
    if (!pessoa) throw new AppError("Pessoa não encontrada.", 404);
    return res.send(pessoa);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.nome) throw new AppError("O campo 'nome' é obrigatório.", 400);
    if (!req.body.email) throw new AppError("O campo 'email' é obrigatório.", 400);
    const pessoa = await PessoaService.create(req.body, req.context.models);
    return res.status(201).send(pessoa);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const pessoa = await PessoaService.update(
      req.params.id,
      req.body,
      req.context.models,
    );
    if (!pessoa) throw new AppError("Pessoa não encontrada.", 404);
    return res.send(pessoa);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await PessoaService.remove(
      req.params.id,
      req.context.models,
    );
    if (!deleted) throw new AppError("Pessoa não encontrada.", 404);
    return res.send({ message: "Pessoa removida com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, update, remove };