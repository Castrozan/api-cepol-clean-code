import dotenv from 'dotenv';
import { Config } from './types.js';

dotenv.config();

const configs: Record<string, Config> = {
    development: {
        port: ((p) => (isNaN(p) ? 3000 : p))(Number(process.env.PORT))
    },
    test: {
        port: ((p) => (isNaN(p) ? 3000 : p))(Number(process.env.PORT))
    },
    production: {
        port: ((p) => (isNaN(p) ? 3000 : p))(Number(process.env.PORT))
    }
};

const environment = process.env.NODE_ENV ?? 'development';
const config: Config = configs[environment] || configs.development;

export default config;
