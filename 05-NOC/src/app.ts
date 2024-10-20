import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";
import 'dotenv/config'

(async() => {

    main()

})();

function main() {
    // Server.start() //Llamar la clase con el método
    // console.log(process.env.MAILER_EMAIL)
    console.log(envs.PORT)
    console.log(envs.MAILER_EMAIL)
}