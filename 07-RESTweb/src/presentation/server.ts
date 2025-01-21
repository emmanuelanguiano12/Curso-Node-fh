import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {

    private app = express();

    private readonly port: number
    private readonly public_path: string
    private readonly routes: Router;

    constructor(options: Options){
        const {port, routes, public_path = 'public'} = options;

        this.port = port;
        this.public_path = public_path;
        this.routes = routes
    }

    async start(){

        //* Middleware (funciones que se ejecutan en todo momento cuando pasa por una ruta)
        this.app.use(express.json()) //? Cualquier petición que pase por el servidor pasa por este middleware
        this.app.use(express.urlencoded({extended: true}))

        //* Public folder
        this.app.use(express.static(this.public_path)) //Obetener la carpeta public
    
        // Routes
        this.app.use(this.routes)

        // Manejar una ruta que no sea el root
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
            res.sendFile(indexPath)

            return;
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })

    }

}