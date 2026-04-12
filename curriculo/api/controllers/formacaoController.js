import AppError from "../errors/AppError";
import FormacaoService from "../services/formacaoService";

const getAll = async (req, res, next) => {
  try {
    const formacoes = await FormacaoService.getAll(req.context.models);
    return res.send(formacoes);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const formacao = await FormacaoService.getById(
      req.params.id,
      req.context.models,
    );
    if (!formacao) throw new AppError("Formação não encontrada.", 404);
    return res.send(formacao);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.instituicao) throw new AppError("O campo 'instituicao' é obrigatório.", 400);
    if (!req.body.curso) throw new AppError("O campo 'curso' é obrigatório.", 400);
    if (!req.body.periodo) throw new AppError("O campo 'periodo' é obrigatório.", 400);
    if (!req.body.pessoaId) throw new AppError("O campo 'pessoaId' é obrigatório.", 400);
    const formacao = await FormacaoService.create(req.body, req.context.models);
    return res.status(201).send(formacao);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const formacao = await FormacaoService.update(
      req.params.id,
      req.body,
      req.context.models,
    );
    if (!formacao) throw new AppError("Formação não encontrada.", 404);
    return res.send(formacao);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await FormacaoService.remove(
      req.params.id,
      req.context.models,
    );
    if (!deleted) throw new AppError("Formação não encontrada.", 404);
    return res.send({ message: "Formação removida com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, update, remove };