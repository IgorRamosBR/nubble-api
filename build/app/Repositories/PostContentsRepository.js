"use strict";
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
const PostContent_1 = __importDefault(global[Symbol.for('ioc.use')]("App//Models/PostContent"));
class PostContentsRepository {
    create(timelineDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.create(timelineDTO);
        });
    }
    show(timeline_category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.findBy('id', timeline_category_id);
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.create(data);
        });
    }
    update(postContent) {
        return __awaiter(this, void 0, void 0, function* () {
            return postContent.save();
        });
    }
    findBy(findKey, findValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.findBy(findKey, findValue);
        });
    }
    findOrCreate(searchPayload, createPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.firstOrCreate(searchPayload, createPayload);
        });
    }
    deleteFromPost(postId, notDeleteIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return PostContent_1.default.query().where({ post_id: postId }).whereNotIn('id', notDeleteIds).update({
                is_deleted: true,
                deleted_at: luxon_1.DateTime.now(),
            });
        });
    }
}
exports.default = PostContentsRepository;
//# sourceMappingURL=PostContentsRepository.js.map