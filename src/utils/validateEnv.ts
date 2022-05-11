import { cleanEnv, str, port } from 'envalid'

const validateEnv = (): void => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        MONGO_PATH: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
    })
}

export default validateEnv
