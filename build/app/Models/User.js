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
const luxon_1 = require("luxon");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const BaseModel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Models/BaseModel"));
const Message_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Message"));
const Follow_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Follow"));
class User extends BaseModel_1.default {
    constructor() {
        super(...arguments);
        this.serializeExtras = true;
    }
    get full_name() {
        return `${this.firstName} ${this.lastName}`;
    }
    static hashPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.$dirty.password)
                user.password = yield Hash_1.default.make(user.password);
        });
    }
    static attachUserName(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.username) {
                user.username = user.email.split('@')[0];
                for (let i = 0;; i++) {
                    if (!(yield User.query().where('username', user.username).first()))
                        user.username = `${user.username}${i}`;
                    else
                        break;
                }
            }
        });
    }
    receivedMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return Message_1.default.query().where('recipient_id', this.id);
        });
    }
}
User.table = 'users';
User.searchQueryScope = (0, Orm_1.scope)((query, search) => {
    const fields = ['first_name', 'last_name', 'username', 'email'];
    let sql = '';
    fields.forEach((field, i) => (sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} ilike '%${search}%'`));
    return query.whereRaw(`(${sql})`);
});
User.followersCount = (0, Orm_1.scope)((query) => query.withCount('follower', (builder) => builder.as('following_count')));
User.followedCount = (0, Orm_1.scope)((query) => query.withCount('followed', (builder) => builder.as('followers_count')));
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], User.prototype, "full_name", null);
__decorate([
    (0, Orm_1.column)({ columnName: 'first_name' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, Orm_1.column)({ columnName: 'last_name' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, Orm_1.column)({ columnName: 'profile_url' }),
    __metadata("design:type", String)
], User.prototype, "profileURL", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Object)
], User.prototype, "temp_password", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], User.prototype, "temp_token", void 0);
__decorate([
    (0, Orm_1.column)({ columnName: 'remember_me_token' }),
    __metadata("design:type", Object)
], User.prototype, "rememberMeToken", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], User.prototype, "is_online", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Boolean)
], User.prototype, "is_blocked", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Boolean)
], User.prototype, "is_deleted", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], User.prototype, "temp_token_created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "updated_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoUpdate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "deleted_at", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Message_1.default),
    __metadata("design:type", Object)
], User.prototype, "messages", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Follow_1.default, { foreignKey: 'follower_user_id' }),
    __metadata("design:type", Object)
], User.prototype, "follower", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Follow_1.default, { foreignKey: 'followed_user_id' }),
    __metadata("design:type", Object)
], User.prototype, "followed", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "attachUserName", null);
exports.default = User;
//# sourceMappingURL=User.js.map