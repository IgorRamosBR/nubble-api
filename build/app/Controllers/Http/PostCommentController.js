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
const PostComment_1 = global[Symbol.for('ioc.use')]("App/Services/PostComment");
const PostCommentValidators_1 = global[Symbol.for('ioc.use')]("App/Validators/PostCommentValidators");
class PostCommentController {
    index({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = request.input('page', 1);
            const perPage = request.input('per_page', 10);
            const postId = request.input('post_id', null);
            const indexService = tsyringe_1.container.resolve(PostComment_1.IndexPostCommentService);
            const postComment = yield indexService.run(page, postId, perPage);
            return response.json(postComment);
        });
    }
    show({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = params;
            const showService = tsyringe_1.container.resolve(PostComment_1.ShowPostCommentService);
            const postComment = yield showService.run(commentId);
            return response.json(postComment);
        });
    }
    store({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield request.validate(PostCommentValidators_1.PostCommentValidators.Store);
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const createService = tsyringe_1.container.resolve(PostComment_1.CreatePostCommentService);
            const postComment = yield createService.run(Object.assign(Object.assign({}, data), { user_id: userId }));
            return response.json(postComment);
        });
    }
    update({ request, response, params, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield request.validate(PostCommentValidators_1.PostCommentValidators.Update);
            const { commentId } = params;
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const updateService = tsyringe_1.container.resolve(PostComment_1.UpdatePostCommentService);
            const postComment = yield updateService.run(Object.assign({}, data), commentId, userId);
            return response.json(postComment);
        });
    }
    destroy({ response, params, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = params;
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const deleteService = tsyringe_1.container.resolve(PostComment_1.DeletePostCommentService);
            yield deleteService.run(commentId, userId);
            return response.json({ message: 'Comment deleted.' });
        });
    }
}
exports.default = PostCommentController;
//# sourceMappingURL=PostCommentController.js.map