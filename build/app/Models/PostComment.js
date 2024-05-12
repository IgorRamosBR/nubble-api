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
class PostComment extends BaseModel_1.default {
    constructor() {
        super(...arguments);
        this.serializeExtras = true;
    }
}
PostComment.table = 'post_comments';
PostComment.loadUser = (0, Orm_1.scope)((query) => {
    query.preload('user');
});
PostComment.loadPost = (0, Orm_1.scope)((query) => {
    query.preload('post');
});
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PostComment.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PostComment.prototype, "message", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PostComment.prototype, "user_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PostComment.prototype, "post_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], PostComment.prototype, "hub_event_id", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Boolean)
], PostComment.prototype, "is_deleted", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PostComment.prototype, "created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PostComment.prototype, "updated_at", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], PostComment.prototype, "deleted_at", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, { foreignKey: 'user_id' }),
    __metadata("design:type", Object)
], PostComment.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Post_1.default, { foreignKey: 'post_id' }),
    __metadata("design:type", Object)
], PostComment.prototype, "post", void 0);
exports.default = PostComment;
//# sourceMappingURL=PostComment.js.map