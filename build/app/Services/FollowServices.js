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
const tsyringe_1 = require("tsyringe");
const NotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/NotFoundException"));
let FollowServices = class FollowServices {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }
    listFollowing({ page = 1, perPage = 10, userId = 0 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.followRepository.listWithPagination({
                page,
                perPage,
                scopes: (scopes) => {
                    scopes.loadFollower(userId);
                },
            });
        });
    }
    listFollower({ page = 1, perPage = 10, userId = 0 }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.followRepository.listWithPagination({
                page,
                perPage,
                scopes: (scopes) => {
                    scopes.loadFollowed(userId);
                },
            });
        });
    }
    isFallowed(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const followDto = __rest(data, []);
            return this.followRepository.isFallowed(Number(followDto.follower_user_id), Number(followDto.followed_user_id));
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const followDto = __rest(data, []);
            const follow = yield this.followRepository.store(followDto);
            yield follow.load('followed', (builder) => {
                builder.select(['id', 'first_name', 'last_name', 'username', 'email', 'profile_url', 'is_online']);
            });
            return follow.refresh();
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const followDto = __rest(data, []);
            const follow = yield this.followRepository.findBy('id', Number(followDto.id));
            if ((follow === null || follow === void 0 ? void 0 : follow.follower_user_id) !== followDto.follower_user_id)
                throw new NotFoundException_1.default('User not found or not available.');
            if (!follow)
                throw new NotFoundException_1.default('User not found or not available.');
            yield follow.delete();
        });
    }
};
FollowServices = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('FollowRepository')),
    __metadata("design:paramtypes", [Object])
], FollowServices);
exports.default = FollowServices;
//# sourceMappingURL=FollowServices.js.map