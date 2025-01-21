/* Se manda la ruta del middleware (/api/todos) */

import { Router } from "express";
import { TodosControllers } from './controller';
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.implementation";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.implementation";

export class TodoRoutes {

  static get routes(): Router {

    const router = Router();

    const dataSource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(dataSource);
    const todoController = new TodosControllers(todoRepository)

    // Rutas de la aplicación
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodosById); // Recibir el "id"
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
  
}
