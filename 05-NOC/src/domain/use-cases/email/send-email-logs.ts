import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevels } from "../../entities/log.entity";
import { LogRepository } from '../../repository/log.respository';


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase{

    constructor(
        //Inyección de dependencias
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]) {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
            if(!sent){
                throw new Error('Email log not sent')
            }

            const log = new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevels.low,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)

            return true;

        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevels.high,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log)
            return false;

        }

    }

}
