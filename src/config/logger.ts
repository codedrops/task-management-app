import winston from 'winston';
import path from 'path';
import { ENV, LoggerConfig } from './interface';

const logger = winston.createLogger({
    defaultMeta: { service: 'task-management' },
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [],
});

export function initLogger({ env, logLevel: level }: LoggerConfig): void {
    logger.add(
        new winston.transports.Console({
            level,
            silent: env === ENV.TEST,
        }),
    );

    if (env !== ENV.DEVELOPMENT) {
        logger.add(
            new winston.transports.File({
                level,
                filename: path.join(__dirname, '../../logs/app.log'),
            }),
        );
    }
}

export function destroy(): void {
    logger.clear();
    logger.close();
}

export default logger;
