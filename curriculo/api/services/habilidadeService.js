const getAll = async (models) => {
  return await models.Habilidade.findAll();
};

const getById = async (id, models) => {
  return await models.Habilidade.findByPk(id);
};

const create = async (dados, models) => {
  return await models.Habilidade.create(dados);
};

const update = async (id, dados, models) => {
  const habilidade = await models.Habilidade.findByPk(id);
  if (!habilidade) return null;
  return await habilidade.update(dados);
};

const remove = async (id, models) => {
  const habilidade = await models.Habilidade.findByPk(id);
  if (!habilidade) return null;
  await habilidade.destroy();
  return true;
};

export default { getAll, getById, create, update, remove };