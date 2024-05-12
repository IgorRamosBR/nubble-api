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
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Posts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'posts';
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.schema.hasTable(this.tableName)))
                this.schema.createTable(this.tableName, (table) => {
                    table.increments('id');
                    table.text('text');
                    table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
                    table.string('image_url');
                    table.boolean('is_fixed').defaultTo(false);
                    table.boolean('is_activated').defaultTo(true);
                    table.boolean('is_deleted').defaultTo(false);
                    table.timestamp('created_at', { useTz: true });
                    table.timestamp('updated_at', { useTz: true });
                    table.timestamp('deleted_at', { useTz: true });
                });
            else
                Logger_1.default.info('Posts migration already running');
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema.dropTable(this.tableName);
        });
    }
}
exports.default = Posts;
//# sourceMappingURL=1681154699762_posts.js.map