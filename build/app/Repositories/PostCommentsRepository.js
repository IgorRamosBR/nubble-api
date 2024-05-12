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
const PostComment_1 = __importDefault(require("../Models/PostComment"));
class PostCommentsRepository {
    create(timelineDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.create(timelineDTO);
        });
    }
    index(page, postId, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.query()
                .withScopes((scopes) => {
                scopes.loadUser();
            })
                .withScopes((scopes) => {
                scopes.loadPost();
            })
                .where({
                post_id: postId,
            })
                .orderBy('created_at', 'desc')
                .paginate(page, perPage);
        });
    }
    show(postCommentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.query()
                .withScopes((scopes) => {
                scopes.loadUser();
            })
                .where('id', postCommentId)
                .first();
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.create(data);
        });
    }
    update(timeline_category) {
        return __awaiter(this, void 0, void 0, function* () {
            return timeline_category.save();
        });
    }
    findBy(findKey, findValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.findBy(findKey, findValue);
        });
    }
    findByEager(findKey, findValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.query()
                .withScopes((scopes) => {
                scopes.loadUser();
            })
                .withScopes((scopes) => {
                scopes.loadPost();
            })
                .where(findKey, findValue)
                .first();
        });
    }
    findOrCreate(searchPayload, createPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.firstOrCreate(searchPayload, createPayload);
        });
    }
    getCommentCountBetweenDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentCount = yield PostComment_1.default.query()
                .whereBetween('created_at', [startDate, endDate])
                .count('*');
            return Number(commentCount[0].$extras.count);
        });
    }
    getUserCountByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactionCount = yield PostComment_1.default.query()
                .where({
                post_id: postId,
            })
                .countDistinct('user_id');
            return Number(reactionCount[0].$extras.count);
        });
    }
    getLastByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostComment_1.default.query().where({ post_id: postId }).orderBy('created_at', 'desc').first();
        });
    }
}
exports.default = PostCommentsRepository;
//# sourceMappingURL=PostCommentsRepository.js.map