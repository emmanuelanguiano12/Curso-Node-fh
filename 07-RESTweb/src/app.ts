import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"


//Punto de entrada
(()=> {
    main()
})()

//? Rest hace que la autenticación sea pasiva (solo cuando se solicita el endpoint)

function main(){
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    })
    server.start()
}