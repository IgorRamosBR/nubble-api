"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
exports.default = Factory_1.default.define(User_1.default, ({ faker }) => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}).build();
//# sourceMappingURL=UserFactory.js.map