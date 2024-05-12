"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostContentsRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/PostContentsRepository"));
tsyringe_1.container.registerSingleton('PostContentRepository', (0, tsyringe_1.delay)(() => PostContentsRepository_1.default));
//# sourceMappingURL=PostContentContainer.js.map