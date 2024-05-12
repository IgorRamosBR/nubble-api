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
class UsersSchema extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema.createTable(this.tableName, (table) => {
                table.increments('id').primary();
                table.string('first_name', 80).notNullable();
                table.string('last_name', 80).notNullable();
                table.string('username', 50).notNullable().unique();
                table.string('email', 255).notNullable().unique();
                table.string('password', 180).notNullable();
                table.string('temp_token').nullable();
                table.string('temp_password', 180).nullable();
                table.string('remember_me_token').nullable();
                table.string('profile_url');
                table.boolean('is_online').notNullable().defaultTo(false);
                table.boolean('is_blocked').notNullable().defaultTo(false);
                table.boolean('is_deleted').notNullable().defaultTo(false);
                table.timestamp('created_at', { useTz: true }).notNullable();
                table.timestamp('updated_at', { useTz: true }).notNullable();
                table.timestamp('deleted_at', { useTz: true }).defaultTo(null);
                table.timestamp('temp_token_created_at', { useTz: true }).nullable();
            });
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema.dropTable(this.tableName);
        });
    }
}
exports.default = UsersSchema;
//# sourceMappingURL=1653272555138_users.js.map