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
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const BaseModel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Models/BaseModel"));
class PostReaction extends BaseModel_1.default {
    constructor() {
        super(...arguments);
        this.serializeExtras = true;
    }
}
PostReaction.table = 'post_reactions';
PostReaction.loadUser = (0, Orm_1.scope)((query) => {
    query.preload('user', (builder) => {
        builder.select(['id', 'first_name', 'last_name', 'username', 'email', 'profile_url', 'is_online']);
    });
});
PostReaction.loadPost = (0, Orm_1.scope)((query) => {
    query.preload('post', (builder) => {
        builder.select(['id', 'text', 'image_url']);
    });
});
PostReaction.loadPostUser = (0, Orm_1.scope)((query) => {
    query.preload('post', (builder) => {
        builder.select(['id', 'text', 'image_url', 'user_id']);
        builder.preload('user', (builder) => {
            builder.select(['id', 'first_name', 'last_name', 'username', 'email', 'profile_url', 'is_online']);
        });
    });
});
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PostReaction.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PostReaction.prototype, "emoji_type", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PostReaction.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PostReaction.prototype, "post_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], PostReaction.prototype, "hub_event_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PostReaction.prototype, "is_checked", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PostReaction.prototype, "created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PostReaction.prototype, "updated_at", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], PostReaction.prototype, "deleted_at", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, { foreignKey: 'user_id' }),
    __metadata("design:type", Object)
], PostReaction.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Post_1.default, { foreignKey: 'post_id' }),
    __metadata("design:type", Object)
], PostReaction.prototype, "post", void 0);
exports.default = PostReaction;
//# sourceMappingURL=PostReaction.js.map