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
const tsyringe_1 = require("tsyringe");
const FollowServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FollowServices"));
const FollowValidators_1 = global[Symbol.for('ioc.use')]("App/Validators/FollowValidators");
class FollowController {
    listFollowing({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const { page, perPage } = request.qs();
            const listFollowerService = tsyringe_1.container.resolve(FollowServices_1.default);
            const followers = yield listFollowerService.listFollowing({ page, perPage, userId });
            return response.json(followers);
        });
    }
    listFollower({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const { page, perPage } = request.qs();
            const listFollowedService = tsyringe_1.container.resolve(FollowServices_1.default);
            const followed = yield listFollowedService.listFollower({ page, perPage, userId });
            return response.json(followed);
        });
    }
    storeFollower({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const { followed_user_id } = yield request.validate(FollowValidators_1.FollowValidators.Create);
            const createFollowService = tsyringe_1.container.resolve(FollowServices_1.default);
            const isFallowed = yield createFollowService.isFallowed({ follower_user_id: userId, followed_user_id });
            if (isFallowed) {
                return response.status(400).json({ message: 'You already follow this user' });
            }
            const follow = yield createFollowService.store({ follower_user_id: userId, followed_user_id });
            return response.json(follow);
        });
    }
    deleteFollower({ params, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = params;
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const deleteFollowService = tsyringe_1.container.resolve(FollowServices_1.default);
            yield deleteFollowService.delete({ id, follower_user_id: userId });
            return response.json({ message: 'Follow deleted' });
        });
    }
}
exports.default = FollowController;
//# sourceMappingURL=FollowController.js.map