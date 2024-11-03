import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.respository';
import { LogEntity, LogSeverityLevels } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments: Attachment[];
}

interface Attachment {
    filename?: string;
    path?: string;
}

//Patrón adaptador
export class EmailService {

    private transporter = nodemailer.createTransport({

        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }

    });

    constructor(
        //Inyección de dependencias
        private readonly logRepository: LogRepository,
    ) {}

    async sendEmail(options: SendMailOptions):Promise<boolean> {

        const {to, subject, htmlBody, attachments = []} = options

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            console.log(sentInformation)

            const log = new LogEntity({
                level: LogSeverityLevels.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            })
            this.logRepository.saveLog(log)

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevels.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            })
            this.logRepository.saveLog(log)

            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs de sistema NOC</h3>
            <p>Hola</p>
            <p>Ver logs</p>
        `

        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        this.sendEmail({
            to, subject, attachments, htmlBody
        })

    }

}