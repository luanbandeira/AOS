const getAll = async (models) => {
  return await models.Projeto.findAll();
};

const getById = async (id, models) => {
  return await models.Projeto.findByPk(id);
};

const create = async (dados, models) => {
  return await models.Projeto.create(dados);
};

const update = async (id, dados, models) => {
  const projeto = await models.Projeto.findByPk(id);
  if (!projeto) return null;
  return await projeto.update(dados);
};

const remove = async (id, models) => {
  const projeto = await models.Projeto.findByPk(id);
  if (!projeto) return null;
  await projeto.destroy();
  return true;
};

export default { getAll, getById, create, update, remove };