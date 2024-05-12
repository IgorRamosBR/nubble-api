"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class JwtTokens extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'jwt_tokens';
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema.createTable(this.tableName, (table) => {
                table.increments('id').primary();
                table.integer('user_id').unsigned().references('id').inTable('').onDelete('CASCADE');
                table.string('name').notNullable();
                table.string('type').notNullable();
                table.string('token', 64).notNullable().unique();
                table.timestamp('expires_at', { useTz: true }).notNullable();
                table.timestamp('created_at', { useTz: true }).notNullable();
            });
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema.dropTable(this.tableName);
        });
    }
}
exports.default = JwtTokens;
//# sourceMappingURL=1694909159532_jwt_tokens.js.map