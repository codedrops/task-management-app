import winston from 'winston';
import path from 'path';
import { ENV, LoggerConfig } from './interface';

const logger = winston.createLogger({
    defaultMeta: { service: 'task-management' },
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [],
});

function init({ env, logLevel: level }: LoggerConfig): void {
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

function destroy(): void {
    logger.clear();
    logger.close();
}

// Export the logger instance along with the init and destroy methods
export default Object.assign(logger, { init, destroy });