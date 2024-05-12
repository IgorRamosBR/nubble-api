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
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const PostReaction_1 = global[Symbol.for('ioc.use')]("App/Services/PostReaction");
const PostReactionValidators_1 = global[Symbol.for('ioc.use')]("App/Validators/PostReactionValidators");
class PostReactionController {
    index({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = request.input('page', 1);
            const perPage = request.input('per_page', 10);
            const postId = request.input('post_id', null);
            const userId = request.input('user_id', null);
            const reactionType = request.input('reaction_type', null);
            const postsReactionService = tsyringe_1.container.resolve(PostReaction_1.IndexPostReactionService);
            const posts = yield postsReactionService.run(page, perPage, postId, userId, reactionType);
            return response.json(posts);
        });
    }
    myReactions({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const page = request.input('page', 1);
            const perPage = request.input('per_page', 10);
            const postId = request.input('post_id', null);
            const reactionType = request.input('reaction_type', null);
            const postsReactionService = tsyringe_1.container.resolve(PostReaction_1.IndexPostReactionService);
            const posts = yield postsReactionService.run(page, perPage, postId, userId, reactionType);
            return response.json(posts);
        });
    }
    storeUpdate({ request, params, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            request.updateBody({ post_id: params.postId, user_id: userId, emoji_type: params.emojiType });
            const data = yield request.validate(PostReactionValidators_1.PostReactionValidators.StoreUpdate);
            const createService = tsyringe_1.container.resolve(PostReaction_1.CreateUpdatePostReactionService);
            const postReaction = yield createService.run(Object.assign({}, data));
            return response.json(postReaction);
        });
    }
    destroy({ request, params, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            request.updateBody({ post_id: params.postId, user_id: userId, emoji_type: params.emojiType });
            const data = yield request.validate(PostReactionValidators_1.PostReactionValidators.Delete);
            const deleteService = tsyringe_1.container.resolve(PostReaction_1.DeletePostReactionService);
            yield deleteService.run(data.post_id, data.user_id, data.emoji_type);
            return response.json({ message: 'Reaction deleted.' });
        });
    }
}
exports.default = PostReactionController;
//# sourceMappingURL=PostReactionController.js.map