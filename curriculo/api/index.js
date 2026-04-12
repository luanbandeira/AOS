import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = { models };
  next();
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/pessoas", routes.pessoa);
app.use("/experiencias", routes.experiencia);
app.use("/formacoes", routes.formacao);
app.use("/habilidades", routes.habilidade);
app.use("/projetos", routes.projeto);

app.get("/", (req, res) => {
  res.send("Servidor rodando!\n" + process.env.MESSAGE);
});

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await seedDatabase();
  }

  app.listen(port, () =>
    console.log("Curriculo API listening on port " + port + "!"),
  );
});

const seedDatabase = async () => {
  const pessoa1 = await models.Pessoa.create({
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "81999990001",
    cidade: "Recife",
  });

  await models.Experiencia.create({
    empresa: "Tech Recife",
    cargo: "Desenvolvedor Full Stack",
    periodo: "2022 - atual",
    descricao: "Desenvolvimento de aplicações web com React e Node.js",
    pessoaId: pessoa1.id,
  });

  await models.Formacao.create({
    instituicao: "CESAR School",
    curso: "Análise e Desenvolvimento de Sistemas",
    periodo: "2021 - 2023",
    pessoaId: pessoa1.id,
  });

  await models.Habilidade.create({ nome: "JavaScript", nivel: "Avançado", pessoaId: pessoa1.id });
  await models.Habilidade.create({ nome: "Node.js", nivel: "Intermediário", pessoaId: pessoa1.id });

  await models.Projeto.create({
    nome: "Portfolio Pessoal",
    descricao: "Site de portfólio desenvolvido com React",
    link: "https://github.com/joaosilva/portfolio",
    pessoaId: pessoa1.id,
  });

  const pessoa2 = await models.Pessoa.create({
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "81999990002",
    cidade: "Olinda",
  });

  await models.Experiencia.create({
    empresa: "Porto Digital",
    cargo: "UX Designer",
    periodo: "2021 - atual",
    descricao: "Design de interfaces e experiência do usuário",
    pessoaId: pessoa2.id,
  });

  await models.Formacao.create({
    instituicao: "UFPE",
    curso: "Design",
    periodo: "2018 - 2022",
    pessoaId: pessoa2.id,
  });

  await models.Habilidade.create({ nome: "Figma", nivel: "Avançado", pessoaId: pessoa2.id });
  await models.Habilidade.create({ nome: "React", nivel: "Básico", pessoaId: pessoa2.id });

  await models.Projeto.create({
    nome: "App de Receitas",
    descricao: "Aplicativo mobile de receitas culinárias",
    link: "https://github.com/mariasantos/receitas",
    pessoaId: pessoa2.id,
  });
};

export default app;