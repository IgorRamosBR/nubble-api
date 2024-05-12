"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostsRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/PostsRepository"));
tsyringe_1.container.registerSingleton('PostsRepository', (0, tsyringe_1.delay)(() => PostsRepository_1.default));
//# sourceMappingURL=PostContainer.js.map