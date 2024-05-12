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
const luxon_1 = require("luxon");
const crypto_1 = __importDefault(require("crypto"));
const NotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/NotFoundException"));
let UserServices = class UserServices {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    list({ page = 1, perPage = 10, search, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.listWithPagination({
                page,
                perPage,
                scopes: (scopes) => {
                    scopes.searchQueryScope(search);
                },
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findBy('id', id, {
                scopes: (scopes) => {
                    scopes.followersCount();
                    scopes.followedCount();
                },
            });
            if (!user)
                throw new NotFoundException_1.default('User not found or not available.');
            return user;
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = __rest(data, []);
            const user = yield this.usersRepository.store(userDto);
            return user.refresh();
        });
    }
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findBy('id', id);
            if (!user)
                throw new NotFoundException_1.default('User not found or not available.');
            const userDto = __rest(data, []);
            user.merge(userDto);
            yield this.usersRepository.save(user);
            return user.refresh();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findBy('id', id);
            if (!user)
                throw new NotFoundException_1.default('User not found or not available.');
            user.merge({
                email: `deleted:${user.email}:${crypto_1.default.randomBytes(6).toString('hex')}`,
                username: `deleted:${user.username}:${crypto_1.default.randomBytes(6).toString('hex')}`,
                is_deleted: true,
                deleted_at: luxon_1.DateTime.now(),
            });
            yield this.usersRepository.save(user);
        });
    }
};
UserServices = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __metadata("design:paramtypes", [Object])
], UserServices);
exports.default = UserServices;
//# sourceMappingURL=UserServices.js.map