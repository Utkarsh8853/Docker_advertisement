import * as dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
    PORT: Number(process.env.PORT),
    HOST: String(process.env.HOST)
}