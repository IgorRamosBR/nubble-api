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
const PostReaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostReaction"));
class PostsRepository {
    index(page, perPage, postId, userId, reactionType) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseQuery = PostReaction_1.default.query()
                .withScopes((scopes) => {
                scopes.loadPostUser();
            })
                .where('is_checked', true);
            if (postId)
                baseQuery = baseQuery.where('post_id', postId);
            if (userId)
                baseQuery = baseQuery.where('user_id', userId);
            if (reactionType)
                baseQuery = baseQuery.where('emoji_type', reactionType);
            const result = yield baseQuery.orderBy('id', 'desc').paginate(page, perPage);
            const dataProperty = Object.keys(result).find((key) => Array.isArray(result[key]));
            if (dataProperty) {
                result[dataProperty] = result[dataProperty].map((reaction) => {
                    if (reaction.$preloaded.post) {
                        reaction.$preloaded.user = reaction.$preloaded.post.$preloaded.user;
                        delete reaction.$preloaded.post.$preloaded.user;
                    }
                    return reaction;
                });
            }
            return result;
        });
    }
    show(timeline_category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostReaction_1.default.findBy('id', timeline_category_id);
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostReaction_1.default.create(data);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return data.save();
        });
    }
    exists(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseQuery = PostReaction_1.default.query()
                .where({
                post_id: data.post_id,
                user_id: data.user_id,
                emoji_type: data.emoji_type
            });
            return baseQuery.first();
        });
    }
    findBy(findKey, findValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostReaction_1.default.findBy(findKey, findValue);
        });
    }
    deleteFromPost(postId, userId, emojiType) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostReaction_1.default.query()
                .where({ post_id: postId, user_id: userId, emoji_type: emojiType })
                .delete();
        });
    }
    getReactionCountBetweenDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactionCount = yield PostReaction_1.default.query()
                .whereBetween('created_at', [startDate, endDate])
                .count('*');
            return Number(reactionCount[0].$extras.count);
        });
    }
    getUserCountByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactionCount = yield PostReaction_1.default.query()
                .where({
                post_id: postId,
            })
                .countDistinct('user_id');
            return Number(reactionCount[0].$extras.count);
        });
    }
    getLastByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostReaction_1.default.query().where({ post_id: postId }).orderBy('created_at', 'desc').first();
        });
    }
}
exports.default = PostsRepository;
//# sourceMappingURL=PostReactionsRepository.js.map