import AppError from "../errors/AppError";
import HabilidadeService from "../services/habilidadeService";

const getAll = async (req, res, next) => {
  try {
    const habilidades = await HabilidadeService.getAll(req.context.models);
    return res.send(habilidades);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const habilidade = await HabilidadeService.getById(
      req.params.id,
      req.context.models,
    );
    if (!habilidade) throw new AppError("Habilidade não encontrada.", 404);
    return res.send(habilidade);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.nome) throw new AppError("O campo 'nome' é obrigatório.", 400);
    if (!req.body.pessoaId) throw new AppError("O campo 'pessoaId' é obrigatório.", 400);
    const habilidade = await HabilidadeService.create(req.body, req.context.models);
    return res.status(201).send(habilidade);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const habilidade = await HabilidadeService.update(
      req.params.id,
      req.body,
      req.context.models,
    );
    if (!habilidade) throw new AppError("Habilidade não encontrada.", 404);
    return res.send(habilidade);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await HabilidadeService.remove(
      req.params.id,
      req.context.models,
    );
    if (!deleted) throw new AppError("Habilidade não encontrada.", 404);
    return res.send({ message: "Habilidade removida com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, update, remove };