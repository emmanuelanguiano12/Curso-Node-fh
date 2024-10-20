import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.respository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new PostgresDataSource
);

export class Server {
  public static start() {//Metodo
    
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {

      const url = 'https://google.com'
      new CheckService(
        // () => console.log(`${url} is ok`),
        undefined,
        // (error) => console.log(error),
        undefined,
        fileSystemLogRepository,
      ).execute(url)
      // new CheckService().execute('http://localhost:3000')
    });

  }
}
