"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostCommentsRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/PostCommentsRepository"));
tsyringe_1.container.registerSingleton('PostCommentRepository', (0, tsyringe_1.delay)(() => PostCommentsRepository_1.default));
//# sourceMappingURL=PostCommentContainer.js.map