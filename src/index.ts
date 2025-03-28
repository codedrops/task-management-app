import path from 'path';
import app from './app';
import db from './db';
import { createConfig  } from './config/config';
import logger from './config/logger';


async function main(): Promise<void> {
    const configPath: string = path.join(__dirname, '../configs/.env');
    const config = createConfig(configPath);


    logger.init({ env: config.env, logLevel: config.logLevel });
    // await db.init(config);
    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    });
}

main().catch((error) => {
    logger.error('Error starting the server:', error);
    process.exit(1);
});

