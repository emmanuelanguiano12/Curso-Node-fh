import { LogEntity, LogSeverityLevels } from '../entities/log.entity';

export abstract class LogDataSource { //abstract no deja crear una instancia de esta clase
    
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevels): Promise<LogEntity[]>;

}
