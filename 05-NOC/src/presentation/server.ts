import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.respository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new PostgresDataSource
);

export class Server {
  public static start() {//Metodo
    
    console.log("Server started...");
    
    //! Mandar Email
    // const emailService = new EmailService(
    //   fileSystemLogRepository
    // );
    // emailService.sendEmailWithFileSystemLogs(
    //   ['canguiano12@ucol.mx']
    // )

    // CronService.createJob("*/5 * * * * *", () => {

    //   const url = 'https://google.com'
    //   new CheckService(
    //     () => console.log(`${url} is ok`),
    //     // undefined,
    //     (error) => console.log(error),
    //     // undefined,
    //     fileSystemLogRepository,
    //   ).execute(url)
    //   // new CheckService().execute('http://localhost:3000')
    // });

  }
}
