/* Rutas de la aplicación */
/* api/todos, api/auth, api/products */

import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Rutas para manejar cada clase
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }

}
