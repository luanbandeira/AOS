import AppError from "../errors/AppError";
import ProjetoService from "../services/projetoService";

const getAll = async (req, res, next) => {
  try {
    const projetos = await ProjetoService.getAll(req.context.models);
    return res.send(projetos);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const projeto = await ProjetoService.getById(
      req.params.id,
      req.context.models,
    );
    if (!projeto) throw new AppError("Projeto não encontrado.", 404);
    return res.send(projeto);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.nome) throw new AppError("O campo 'nome' é obrigatório.", 400);
    if (!req.body.pessoaId) throw new AppError("O campo 'pessoaId' é obrigatório.", 400);
    const projeto = await ProjetoService.create(req.body, req.context.models);
    return res.status(201).send(projeto);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const projeto = await ProjetoService.update(
      req.params.id,
      req.body,
      req.context.models,
    );
    if (!projeto) throw new AppError("Projeto não encontrado.", 404);
    return res.send(projeto);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await ProjetoService.remove(
      req.params.id,
      req.context.models,
    );
    if (!deleted) throw new AppError("Projeto não encontrado.", 404);
    return res.send({ message: "Projeto removido com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, update, remove };