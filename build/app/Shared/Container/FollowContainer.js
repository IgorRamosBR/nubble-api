"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const FollowRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/FollowRepository"));
tsyringe_1.container.registerSingleton('FollowRepository', (0, tsyringe_1.delay)(() => FollowRepository_1.default));
//# sourceMappingURL=FollowContainer.js.map