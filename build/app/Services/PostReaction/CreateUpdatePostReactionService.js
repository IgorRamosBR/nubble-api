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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUpdatePostReactionService = void 0;
const tsyringe_1 = require("tsyringe");
const NotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/NotFoundException"));
let CreateUpdatePostReactionService = class CreateUpdatePostReactionService {
    constructor(postsRepository, postReactionRepository) {
        this.postsRepository = postsRepository;
        this.postReactionRepository = postReactionRepository;
    }
    run(reactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postsRepository.findBy('id', reactionDto.post_id);
            if (!post)
                throw new NotFoundException_1.default('Not found post with this id or post is not available.');
            const reactionExists = yield this.postReactionRepository.exists(reactionDto);
            if (reactionExists) {
                reactionExists.is_checked = !reactionExists.is_checked;
                return this.update(reactionExists);
            }
            return this.create(reactionDto);
        });
    }
    create(reactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield this.postReactionRepository.store(reactionDto);
            return reaction;
        });
    }
    update(reactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield this.postReactionRepository.update(reactionDto);
            return reaction;
        });
    }
};
CreateUpdatePostReactionService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('PostsRepository')),
    __param(1, (0, tsyringe_1.inject)('PostReactionRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateUpdatePostReactionService);
exports.CreateUpdatePostReactionService = CreateUpdatePostReactionService;
//# sourceMappingURL=CreateUpdatePostReactionService.js.map