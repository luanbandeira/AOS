const getAll = async (models) => {
  return await models.Experiencia.findAll();
};

const getById = async (id, models) => {
  return await models.Experiencia.findByPk(id);
};

const create = async (dados, models) => {
  return await models.Experiencia.create(dados);
};

const update = async (id, dados, models) => {
  const experiencia = await models.Experiencia.findByPk(id);
  if (!experiencia) return null;
  return await experiencia.update(dados);
};

const remove = async (id, models) => {
  const experiencia = await models.Experiencia.findByPk(id);
  if (!experiencia) return null;
  await experiencia.destroy();
  return true;
};

export default { getAll, getById, create, update, remove };