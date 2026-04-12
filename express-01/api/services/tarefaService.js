const getAll = async (models) => {
  return await models.Tarefa.findAll();
};

const getByObjectId = async (objectId, models) => {
  return await models.Tarefa.findByPk(objectId);
};

const create = async (descricao, concluida = false, models) => {
  return await models.Tarefa.create({ descricao, concluida });
};

const update = async (objectId, dados, models) => {
  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) return null;
  return await tarefa.update(dados);
};

const remove = async (objectId, models) => {
  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) return null;
  await tarefa.destroy();
  return true;
};

export default { getAll, getByObjectId, create, update, remove };