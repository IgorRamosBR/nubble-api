"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostReactionsRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/PostReactionsRepository"));
tsyringe_1.container.registerSingleton('PostReactionRepository', (0, tsyringe_1.delay)(() => PostReactionsRepository_1.default));
//# sourceMappingURL=PostReactionContainer.js.map