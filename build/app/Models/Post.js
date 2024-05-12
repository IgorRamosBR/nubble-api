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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const luxon_1 = require("luxon");
const PostComment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostComment"));
const PostContent_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostContent"));
const PostReaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostReaction"));
const BaseModel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Models/BaseModel"));
const User_1 = __importDefault(require("./User"));
const Follow_1 = __importDefault(require("./Follow"));
class Post extends BaseModel_1.default {
    constructor() {
        super(...arguments);
        this.serializeExtras = true;
    }
    get status() {
        if (!this.is_activated)
            return 'disabled';
        else
            return 'published';
    }
}
Post.table = 'posts';
Post.reactionCount = (0, Orm_1.scope)((query, userId) => query
    .preload('reactions', (builder) => builder.distinct('emoji_type').where('user_id', userId).where('is_checked', true))
    .withCount('reactions', (builder) => builder.where('is_checked', true).where('emoji_type', 'like').as('like_count'))
    .withCount('reactions', (builder) => builder.where('is_checked', true).where('emoji_type', 'favorite').as('favorite_count')));
Post.commentCount = (0, Orm_1.scope)((query) => query.withCount('comments', (builder) => builder.where('is_deleted', false).as('comments_count')));
Post.loadUser = (0, Orm_1.scope)((query) => query.preload('user', (builder) => {
    builder.select(['id', 'first_name', 'last_name', 'username', 'email', 'profile_url', 'is_online'])
        .withCount('follower', (builder) => builder.as('following_count'))
        .withCount('followed', (builder) => builder.as('followers_count'));
}));
Post.loadUserForAdmin = (0, Orm_1.scope)((query) => query.preload('user', (builder) => builder.select(['id', 'name', 'email', 'avatar', 'online', 'created_at'])));
Post.loadContents = (0, Orm_1.scope)((query) => query.preload('contents', (builder) => builder.orderBy('order', 'asc')));
Post.loadAlreadyReact = (0, Orm_1.scope)((query, userId) => query.withAggregate('reactions', (builder) => builder
    .max('emoji_type')
    .where('user_id', userId)
    .where('is_checked', true)
    .groupBy('id', 'user_id', 'post_id', 'emoji_type')
    .orderBy('id', 'desc')
    .limit(1)
    .as('already_reacted')));
Post.filterByDate = (0, Orm_1.scope)((query, startDate, endDate) => query.andWhereBetween('created_at', [startDate.toString(), endDate.toString()]));
Post.filterByAdmin = (0, Orm_1.scope)((query) => query.whereHas('user', (userQuery) => userQuery.where('admin', true)));
Post.onlyPublished = (0, Orm_1.scope)((query) => query.andWhere('is_activated', true));
Post.searchQueryScope = (0, Orm_1.scope)((query, search) => {
    const fields = ['text'];
    let sql = '';
    fields.forEach((field, i) => (sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} ilike '%${search}%'`));
    return query.where((builder) => {
        builder.whereRaw(`(${sql})`).orWhereNull('text');
    });
});
Post.authorIdScope = (0, Orm_1.scope)((query, authorId) => {
    return query.where((builder) => {
        builder.where('user_id', '=', authorId);
    });
});
Post.orderQueryScope = (0, Orm_1.scope)((query, orders) => {
    query.orderByRaw(`(case when posts.is_fixed = true then 1 else 2 end) asc`);
    for (const { column, direction } of orders) {
        query.orderBy(column, direction);
    }
    return query;
});
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Post.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.column)({ columnName: 'image_url' }),
    __metadata("design:type", String)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Post.prototype, "status", null);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Post.prototype, "is_fixed", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Post.prototype, "is_activated", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Boolean)
], Post.prototype, "is_deleted", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Post.prototype, "created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Post.prototype, "updated_at", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], Post.prototype, "deleted_at", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, { foreignKey: 'user_id' }),
    __metadata("design:type", Object)
], Post.prototype, "user", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => PostContent_1.default, { foreignKey: 'post_id' }),
    __metadata("design:type", Object)
], Post.prototype, "contents", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => PostReaction_1.default, { foreignKey: 'post_id' }),
    __metadata("design:type", Object)
], Post.prototype, "reactions", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => PostComment_1.default, { foreignKey: 'post_id' }),
    __metadata("design:type", Object)
], Post.prototype, "comments", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Follow_1.default, { localKey: 'user_id', foreignKey: 'follower_user_id' }),
    __metadata("design:type", Object)
], Post.prototype, "follower", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Follow_1.default, { localKey: 'user_id', foreignKey: 'followed_user_id' }),
    __metadata("design:type", Object)
], Post.prototype, "followed", void 0);
exports.default = Post;
//# sourceMappingURL=Post.js.map