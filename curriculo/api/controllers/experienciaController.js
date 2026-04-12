import AppError from "../errors/AppError";
import ExperienciaService from "../services/experienciaService";

const getAll = async (req, res, next) => {
  try {
    const experiencias = await ExperienciaService.getAll(req.context.models);
    return res.send(experiencias);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const experiencia = await ExperienciaService.getById(
      req.params.id,
      req.context.models,
    );
    if (!experiencia) throw new AppError("Experiência não encontrada.", 404);
    return res.send(experiencia);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.empresa) throw new AppError("O campo 'empresa' é obrigatório.", 400);
    if (!req.body.cargo) throw new AppError("O campo 'cargo' é obrigatório.", 400);
    if (!req.body.periodo) throw new AppError("O campo 'periodo' é obrigatório.", 400);
    if (!req.body.pessoaId) throw new AppError("O campo 'pessoaId' é obrigatório.", 400);
    const experiencia = await ExperienciaService.create(req.body, req.context.models);
    return res.status(201).send(experiencia);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const experiencia = await ExperienciaService.update(
      req.params.id,
      req.body,
      req.context.models,
    );
    if (!experiencia) throw new AppError("Experiência não encontrada.", 404);
    return res.send(experiencia);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await ExperienciaService.remove(
      req.params.id,
      req.context.models,
    );
    if (!deleted) throw new AppError("Experiência não encontrada.", 404);
    return res.send({ message: "Experiência removida com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, create, update, remove };