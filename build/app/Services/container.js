"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostsRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/PostsRepository"));
tsyringe_1.container.register('PostRepository', {
    useClass: PostsRepository_1.default,
});
//# sourceMappingURL=container.js.map