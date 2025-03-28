import path from 'path';
import app from './app';
import { createConfig  } from './config/config';
import logger, { initLogger } from './config/logger';

const PORT: number = parseInt(process.env.PORT || '3000', 10);

async function main(): Promise<void> {
    const configPath: string = path.join(__dirname, '../configs/.env');
    const config = createConfig(configPath);

    initLogger({ env: config.env, logLevel: config.logLevel });

    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main().catch((error) => {
    logger.error('Error starting the server:', error);
    process.exit(1);
});
