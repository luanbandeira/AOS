const getAll = async (models) => {
  return await models.Formacao.findAll();
};

const getById = async (id, models) => {
  return await models.Formacao.findByPk(id);
};

const create = async (dados, models) => {
  return await models.Formacao.create(dados);
};

const update = async (id, dados, models) => {
  const formacao = await models.Formacao.findByPk(id);
  if (!formacao) return null;
  return await formacao.update(dados);
};

const remove = async (id, models) => {
  const formacao = await models.Formacao.findByPk(id);
  if (!formacao) return null;
  await formacao.destroy();
  return true;
};

export default { getAll, getById, create, update, remove };