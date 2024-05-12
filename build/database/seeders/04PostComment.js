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
const PostComment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PostComment"));
const faker_1 = require("@faker-js/faker");
const date_fns_1 = require("date-fns");
const luxon_1 = require("luxon");
class PostCommentSeeder extends Seeder_1.default {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield PostComment_1.default.createMany(createPostComments());
        });
    }
}
exports.default = PostCommentSeeder;
function createPostComments() {
    const postComments = [];
    for (let i = 0; i < 100; i++) {
        const user_id = Math.floor(Math.random() * 9) + 1;
        const post_id = Math.floor(Math.random() * 24) + 1;
        const message = faker_1.faker.lorem.sentence({ min: 3, max: 10 });
        postComments.push({ user_id, post_id, message, created_at: luxon_1.DateTime.fromISO(getRandomDate()) });
    }
    for (let i = 0; i < 17; i++) {
        const user_id = Math.floor(Math.random() * 9) + 1;
        const post_id = 1;
        const message = faker_1.faker.lorem.sentence({ min: 3, max: 10 });
        postComments.push({ user_id, post_id, message, created_at: luxon_1.DateTime.fromISO(getRandomDate()) });
    }
    return postComments;
}
function getRandomDate() {
    const now = new Date();
    const lastTwoWeeks = (0, date_fns_1.subDays)(now, 14);
    const date = faker_1.faker.date.between({ from: lastTwoWeeks, to: now });
    return (0, date_fns_1.formatISO)(date);
}
//# sourceMappingURL=04PostComment.js.map