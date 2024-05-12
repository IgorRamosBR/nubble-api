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
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const BaseRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Repositories/BaseRepository"));
let PostsRepository = class PostsRepository extends BaseRepository_1.default {
    constructor() {
        super(Post_1.default);
    }
    createManyContents(contents, post) {
        return __awaiter(this, void 0, void 0, function* () {
            return post.related('contents').createMany(contents);
        });
    }
    getMoreInteractedPosts({ startDate, endDate, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.orm
                .query()
                .select('id', 'text')
                .andWhereBetween('created_at', [startDate.toString(), endDate.toString()])
                .withCount('comments', (builder) => builder.where('is_deleted', false).as('post_comments_count'))
                .withCount('reactions', (builder) => builder.where('is_deleted', false).as('post_reactions_count'))
                .orderBy('post_comments_count', 'desc')
                .orderBy('post_reactions_count', 'desc');
            const posts = yield query.limit(3);
            return posts;
        });
    }
    getPostCountBetweenDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const postCount = yield this.orm
                .query()
                .whereBetween('created_at', [startDate, endDate])
                .count('*');
            return Number(postCount[0].$extras.count);
        });
    }
    findBy(key, value, params) {
        return super.findBy(key, value, params);
    }
};
PostsRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], PostsRepository);
exports.default = PostsRepository;
//# sourceMappingURL=PostsRepository.js.map