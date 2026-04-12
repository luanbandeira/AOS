const getAll = async (models) => {
  return await models.Pessoa.findAll({
    include: [
      models.Experiencia,
      models.Formacao,
      models.Habilidade,
      models.Projeto,
    ],
  });
};

const getById = async (id, models) => {
  return await models.Pessoa.findByPk(id, {
    include: [
      models.Experiencia,
      models.Formacao,
      models.Habilidade,
      models.Projeto,
    ],
  });
};

const create = async (dados, models) => {
  return await models.Pessoa.create(dados);
};

const update = async (id, dados, models) => {
  const pessoa = await models.Pessoa.findByPk(id);
  if (!pessoa) return null;
  return await pessoa.update(dados);
};

const remove = async (id, models) => {
  const pessoa = await models.Pessoa.findByPk(id);
  if (!pessoa) return null;
  await pessoa.destroy();
  return true;
};

export default { getAll, getById, create, update, remove };