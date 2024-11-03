import { LogEntity, LogSeverityLevels } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.respository";


interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase{

    constructor( //Inyección de dependencias
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,

        private readonly logRepository: LogRepository,
    ) {}

    public async execute(url: string): Promise<boolean>{

        try {

            const req = await fetch(url)
            if(!req.ok){
                throw new Error(`Error on check service ${url}`)
            }
            
            const options = {message: `Service ${url} working`, level: LogSeverityLevels.low, origin: 'check-service.ts'}
            const log = new LogEntity(options)
            this.logRepository.saveLog(log)

            this.successCallback && this.successCallback();
            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok. ${error}`
            const options = {message: errorMessage, level: LogSeverityLevels.high, origin: 'check-service.ts'}
            const log = new LogEntity(options)

            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage)

            return false

        }

    }

}