

export enum ENV {
    DEVELOPMENT,
    TEST,
    PRODUCTION
}

export interface Config {
    env: ENV;
    port: number;
    mongo: {
        url: string;
    };
    logLevel: string;
}

export interface LoggerConfig {
    env: ENV;
    logLevel: string;
}