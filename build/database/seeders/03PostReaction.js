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
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const PostReaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostReaction"));
class PostReactionSeeder extends Seeder_1.default {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield PostReaction_1.default.createMany(createPostReactions());
        });
    }
}
exports.default = PostReactionSeeder;
function createPostReactions() {
    const postReactions = [];
    const combinations = new Set();
    while (postReactions.length < 200) {
        const user_id = Math.floor(Math.random() * 9) + 1;
        const post_id = Math.floor(Math.random() * 24) + 1;
        const emoji_type = Math.random() < 0.8 ? 'like' : 'favorite';
        const reactionKey = `${user_id}-${post_id}-${emoji_type}`;
        if (!combinations.has(reactionKey)) {
            combinations.add(reactionKey);
            postReactions.push({ user_id, post_id, emoji_type });
        }
    }
    return postReactions;
}
//# sourceMappingURL=03PostReaction.js.map