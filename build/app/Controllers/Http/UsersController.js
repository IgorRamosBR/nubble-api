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
global[Symbol.for('ioc.use')]("App/Services/container");
const tsyringe_1 = require("tsyringe");
const UserValidator_1 = global[Symbol.for('ioc.use')]("App/Validators/UserValidator");
const UserServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/UserServices"));
class UsersController {
    list({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = request.input('page', 1);
            const perPage = request.input('per_page', 10);
            const search = request.input('search', '');
            const userServices = tsyringe_1.container.resolve(UserServices_1.default);
            const users = yield userServices.list({ page, perPage, search });
            return response.json(users);
        });
    }
    get({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = params;
            const userServices = tsyringe_1.container.resolve(UserServices_1.default);
            const user = yield userServices.get(userId);
            return response.json(user);
        });
    }
    edit({ request, auth, response }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const userDto = yield request.validate({ schema: UserValidator_1.EditUserSchema });
            const userServices = tsyringe_1.container.resolve(UserServices_1.default);
            const user = yield userServices.edit(userId, userDto);
            return response.json(user);
        });
    }
    delete({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = params;
            const userServices = tsyringe_1.container.resolve(UserServices_1.default);
            yield userServices.delete(userId);
            return response.json({ message: 'User deleted successfully.' });
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map