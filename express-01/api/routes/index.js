import sessionRoutes from "./session";
import userRoutes from "./user";
import messageRoutes from "./message";
import tarefaRoutes from "./tarefa";
import authRoutes from "./auth"; // NOVO

export default {
  session: sessionRoutes,
  user: userRoutes,
  message: messageRoutes,
  tarefa: tarefaRoutes,
  auth: authRoutes, // NOVO
};