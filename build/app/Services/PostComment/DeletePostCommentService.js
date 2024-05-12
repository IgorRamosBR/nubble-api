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
exports.DeletePostCommentService = void 0;
const luxon_1 = require("luxon");
const tsyringe_1 = require("tsyringe");
const NotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/NotFoundException"));
const AuthorizationException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/AuthorizationException"));
let DeletePostCommentService = class DeletePostCommentService {
    constructor(postCommentRepository) {
        this.postCommentRepository = postCommentRepository;
    }
    run(commentId, userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.postCommentRepository.findByEager('id', commentId);
            if (!comment) {
                throw new NotFoundException_1.default('Not found comment with this id or comment is not available.');
            }
            if (comment.user_id !== userId && ((_a = comment.post) === null || _a === void 0 ? void 0 : _a.user_id) !== userId) {
                throw new AuthorizationException_1.default('Not authorized to delete this comment');
            }
            comment.merge({
                is_deleted: true,
                deleted_at: luxon_1.DateTime.now(),
            });
            yield this.postCommentRepository.update(comment);
            return true;
        });
    }
};
DeletePostCommentService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('PostCommentRepository')),
    __metadata("design:paramtypes", [Object])
], DeletePostCommentService);
exports.DeletePostCommentService = DeletePostCommentService;
//# sourceMappingURL=DeletePostCommentService.js.map