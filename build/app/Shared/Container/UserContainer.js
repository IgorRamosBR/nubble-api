"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UsersRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/UsersRepository"));
tsyringe_1.container.registerSingleton('UsersRepository', (0, tsyringe_1.delay)(() => UsersRepository_1.default));
//# sourceMappingURL=UserContainer.js.map