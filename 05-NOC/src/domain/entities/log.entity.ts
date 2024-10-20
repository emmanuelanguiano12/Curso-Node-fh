
/* Entidad */

import { error } from "console";

export enum LogSeverityLevels {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity {

    public level: LogSeverityLevels;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevels ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {

        const {message, level, createdAt} = JSON.parse(json); //Opuesto de stringify
        
        const log = new LogEntity(message, level)
        log.createdAt = new Date(createdAt)

        return log;

    }

}
