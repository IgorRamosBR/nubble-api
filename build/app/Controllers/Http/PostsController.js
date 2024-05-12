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
const PostValidator_1 = global[Symbol.for('ioc.use')]("App/Validators/PostValidator");
const PostService_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/PostService"));
class PostsController {
    index({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const page = request.input('page', 1);
            const perPage = request.input('per_page', 10);
            const search = request.input('search', '');
            const authorId = request.input('user_id', '');
            const postsService = tsyringe_1.container.resolve(PostService_1.default);
            const posts = yield postsService.list({ page, perPage, search, userId, authorId });
            return response.json(posts);
        });
    }
    show({ params, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const { id: postId } = params;
            const postsService = tsyringe_1.container.resolve(PostService_1.default);
            const post = yield postsService.get(postId, userId);
            return response.json(post);
        });
    }
    store({ request, response, auth }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id;
            const postDto = yield request.validate({ schema: PostValidator_1.StorePostSchema });
            const image = yield request.validate({ schema: PostValidator_1.ValidateImageSchema });
            const postsService = tsyringe_1.container.resolve(PostService_1.default);
            postDto.user_id = userId;
            const post = yield postsService.store(postDto, image);
            return response.json(post);
        });
    }
    update({ request, params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: postId } = params;
            const postDto = yield request.validate({ schema: PostValidator_1.EditPostSchema });
            const image = yield request.validate({ schema: PostValidator_1.ValidateImageSchema });
            const postsService = tsyringe_1.container.resolve(PostService_1.default);
            const post = yield postsService.edit(postId, postDto, image);
            return response.json(post);
        });
    }
    destroy({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: postId } = params;
            const postsService = tsyringe_1.container.resolve(PostService_1.default);
            yield postsService.delete(postId);
            return response.json({ message: 'Post deleted successfully.' });
        });
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map