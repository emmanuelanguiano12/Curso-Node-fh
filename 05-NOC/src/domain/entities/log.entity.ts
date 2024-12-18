
/* Entidad */

import { error } from "console";

export enum LogSeverityLevels {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevels;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevels;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions){
        const {level, message, origin, createdAt = new Date()} = options
        
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {

        const {message, level, createdAt, origin} = JSON.parse(json); //Opuesto de stringify
        
        const log = new LogEntity({message, level, createdAt, origin: origin})

        return log;

    }

}
