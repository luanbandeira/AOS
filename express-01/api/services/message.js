const getAll = async (models) => {
  return await models.Message.findAll();
};

const getById = async (id, models) => {
  return await models.Message.findByPk(id);
};

const create = async (text, userId, models) => {
  return await models.Message.create({ text, userId });
};

const remove = async (id, models) => {
  return await models.Message.destroy({ where: { id } });
};

export default { getAll, getById, create, remove };