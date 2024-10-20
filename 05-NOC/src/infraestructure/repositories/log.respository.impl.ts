import { LogEntity, LogSeverityLevels } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.respository";
import { LogDataSource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements LogRepository {
    // private logDataSource: LogDataSource

    constructor(
        private readonly logDataSource: LogDataSource,
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log)
    }

    async getLogs(severityLevel: LogSeverityLevels): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel)
    }

}