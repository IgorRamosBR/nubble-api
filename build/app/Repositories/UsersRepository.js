"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Repositories/BaseRepository"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersRepository extends BaseRepository_1.default {
    constructor() {
        super(User_1.default);
    }
}
exports.default = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map