"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostReactionValidators = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
var PostReactionValidators;
(function (PostReactionValidators) {
    class StoreUpdate {
        constructor() {
            this.schema = Validator_1.schema.create({
                post_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'posts', column: 'id' })]),
                user_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'users', column: 'id' })]),
                emoji_type: Validator_1.schema.enum(['like', 'favorite']),
            });
        }
    }
    PostReactionValidators.StoreUpdate = StoreUpdate;
    class Delete {
        constructor() {
            this.schema = Validator_1.schema.create({
                post_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'posts', column: 'id' })]),
                user_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'users', column: 'id' })]),
                emoji_type: Validator_1.schema.enum(['like', 'favorite']),
            });
        }
    }
    PostReactionValidators.Delete = Delete;
})(PostReactionValidators = exports.PostReactionValidators || (exports.PostReactionValidators = {}));
//# sourceMappingURL=PostReactionValidators.js.map