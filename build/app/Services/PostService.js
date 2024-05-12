"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
global[Symbol.for('ioc.use')]("App/Services/container");
const tsyringe_1 = require("tsyringe");
const luxon_1 = require("luxon");
const NotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/NotFoundException"));
let PostServices = class PostServices {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    list({ page = 1, perPage = 10, search, userId = 0, authorId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.listWithPagination({
                page,
                perPage,
                orders: [{ column: 'created_at', direction: 'desc' }],
                scopes: (scopes) => {
                    scopes.searchQueryScope(search);
                    scopes.loadUser();
                    scopes.reactionCount(userId);
                    scopes.commentCount();
                    if (authorId) {
                        scopes.authorIdScope(authorId);
                    }
                },
            });
        });
    }
    get(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findBy('id', id, {
                scopes: (scopes) => {
                    scopes.loadUser();
                    scopes.reactionCount(userId);
                    scopes.commentCount();
                },
            });
            if (!post)
                throw new NotFoundException_1.default('Post not found or not available.');
            return post;
        });
    }
    store(data, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const postDto = __rest(data, []);
            const post = yield this.postRepository.store(postDto);
            if (image) {
                yield this.editImage(post, image);
            }
            yield post.load('user');
            return post.refresh();
        });
    }
    edit(id, data, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findBy('id', id);
            if (!post)
                throw new NotFoundException_1.default('Post not found or not available.');
            const postDto = __rest(data, []);
            post.merge(postDto);
            yield this.postRepository.save(post);
            if (image) {
                yield this.editImage(post, image);
            }
            return post.refresh();
        });
    }
    editImage(post, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const localSave = `uploads/posts/${post.id}/${Date.now()}.${image.imageCover.extname}`;
            if (post.imageUrl) {
                yield this.postRepository.deleteImage(post.imageUrl);
            }
            const postImage = yield this.postRepository.uploadImage(localSave, image.imageCover);
            post.merge({
                imageUrl: postImage
            });
            yield this.postRepository.save(post);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findBy('id', id);
            if (!post)
                throw new NotFoundException_1.default('Post not found or not available.');
            post.merge({
                is_deleted: true,
                deleted_at: luxon_1.DateTime.now(),
            });
            yield this.postRepository.save(post);
        });
    }
};
PostServices = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('PostRepository')),
    __metadata("design:paramtypes", [Object])
], PostServices);
exports.default = PostServices;
//# sourceMappingURL=PostService.js.map