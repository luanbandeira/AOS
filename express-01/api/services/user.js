const getAll = async (models) => {
  return await models.User.findAll();
};

const getById = async (id, models) => {
  return await models.User.findByPk(id);
};

export default { getAll, getById };