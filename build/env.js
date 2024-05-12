"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
exports.default = Env_1.default.rules({
    HOST: Env_1.default.schema.string({ format: 'host' }),
    PORT: Env_1.default.schema.number(),
    APP_KEY: Env_1.default.schema.string(),
    APP_NAME: Env_1.default.schema.string(),
    DRIVE_DISK: Env_1.default.schema.enum(['local', 's3']),
    NODE_ENV: Env_1.default.schema.enum(['development', 'production', 'test']),
    S3_KEY: Env_1.default.schema.string.optional(),
    S3_SECRET: Env_1.default.schema.string.optional(),
    S3_BUCKET: Env_1.default.schema.string(),
    S3_REGION: Env_1.default.schema.string(),
    S3_ENDPOINT: Env_1.default.schema.string.optional(),
    S3_CDN_URL: Env_1.default.schema.string.optional(),
    JWT_PUBLIC_KEY: Env_1.default.schema.string(),
    JWT_PRIVATE_KEY: Env_1.default.schema.string(),
    TOKEN_EXPIRES_IN: Env_1.default.schema.string(),
    REFRESH_TOKEN_EXPIRES_IN: Env_1.default.schema.string(),
    PG_HOST: Env_1.default.schema.string({ format: 'host' }),
    PG_PORT: Env_1.default.schema.number(),
    PG_USER: Env_1.default.schema.string(),
    PG_PASSWORD: Env_1.default.schema.string.optional(),
    PG_DB_NAME: Env_1.default.schema.string(),
    PG_DB_NAME_SHADOW: Env_1.default.schema.string(),
    SMTP_HOST: Env_1.default.schema.string({ format: 'host' }),
    SMTP_PORT: Env_1.default.schema.number(),
    SMTP_USERNAME: Env_1.default.schema.string(),
    SMTP_PASSWORD: Env_1.default.schema.string(),
});
//# sourceMappingURL=env.js.map