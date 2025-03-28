import mongoose, { Connection } from 'mongoose';
import logger from '../config/logger';

let mongoUrl: string;

interface InitOptions {
    mongo: {
        url: string;
    };
}

async function init({ mongo: { url } }: InitOptions): Promise<void> {
    mongoUrl = url;

    try {
        await mongoose.connect(mongoUrl);
    } catch (err) {
        logger.error('error in mongo connection', { err });
        setTimeout(() => init({ mongo: { url: mongoUrl } }), 5000);
    }
}

const db: Connection = mongoose.connection;

function destroy(): Promise<void> {
    db.removeAllListeners();
    return mongoose.disconnect();
}

db.on('connected', () => {
    logger.info('mongo connected');
});

db.on('error', (error) => {
    logger.error('error in mongo connection', { error });
    mongoose.disconnect();
});

db.on('disconnected', () => {
    logger.info('mongo disconnected');
    init({ mongo: { url: mongoUrl } });
});


export default { init, destroy };