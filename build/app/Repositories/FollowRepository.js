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
const BaseRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Repositories/BaseRepository"));
const Follow_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Follow"));
class FollowRepository extends BaseRepository_1.default {
    constructor() {
        super(Follow_1.default);
    }
    isFallowed(follower_user_id, followed_user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (follower_user_id === followed_user_id)
                return true;
            return !!(yield this.orm.query()
                .where('follower_user_id', follower_user_id)
                .where('followed_user_id', followed_user_id)
                .first());
        });
    }
}
exports.default = FollowRepository;
//# sourceMappingURL=FollowRepository.js.map