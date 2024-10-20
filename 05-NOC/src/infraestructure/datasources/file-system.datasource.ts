import fs from 'fs'

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevels } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly allMediumLogsPath = 'logs/logs-medium.log';
    private readonly allHighLogsPath = 'logs/logs-high.log';

    constructor(  ){
        //Tan pronto se use el constructor, se crea la carpeta
        this.createLogsFiles();
    }

    private createLogsFiles = () => {

        //Verificar si existe el path
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath)
        }

        //Barrer cada path y ver si existe, si no se inserta un ''
        [
            this.allLogsPath,
            this.allMediumLogsPath,
            this.allHighLogsPath,
        ].forEach(path => {

            if( fs.existsSync(path) ) return;
            
            fs.writeFileSync(path, '')

        })


    }

    //Implementar el datasource
    async saveLog(newLog: LogEntity): Promise<void> { 

        const logAsJson = `${JSON.stringify(newLog) }\n`; //stringify serealiza con json
        
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if( newLog.level === LogSeverityLevels.low) return;

        if( newLog.level == LogSeverityLevels.medium ) {
            fs.appendFileSync(this.allMediumLogsPath, logAsJson)
        } else {
            fs.appendFileSync(this.allHighLogsPath, logAsJson)
        }

    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        
        const content = fs.readFileSync(path, 'utf-8');

        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;


    }

    async getLogs(severityLevel: LogSeverityLevels): Promise<LogEntity[]> {
        
        switch( severityLevel ){
            case LogSeverityLevels.low:

                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevels.medium:
                return this.getLogsFromFile(this.allMediumLogsPath);

            case LogSeverityLevels.high:
                return this.getLogsFromFile(this.allHighLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }

    }
    
}

