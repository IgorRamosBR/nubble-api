"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentValidators = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
var PostCommentValidators;
(function (PostCommentValidators) {
    class Store {
        constructor() {
            this.schema = Validator_1.schema.create({
                post_id: Validator_1.schema.number(),
                message: Validator_1.schema.string(),
            });
        }
    }
    PostCommentValidators.Store = Store;
    class Update {
        constructor() {
            this.schema = Validator_1.schema.create({
                message: Validator_1.schema.string(),
            });
        }
    }
    PostCommentValidators.Update = Update;
})(PostCommentValidators = exports.PostCommentValidators || (exports.PostCommentValidators = {}));
//# sourceMappingURL=PostCommentValidators.js.map