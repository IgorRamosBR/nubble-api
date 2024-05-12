"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowValidators = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
var FollowValidators;
(function (FollowValidators) {
    class Create {
        constructor() {
            this.schema = Validator_1.schema.create({
                followed_user_id: Validator_1.schema.number([Validator_1.rules.exists({ table: 'users', column: 'id' })]),
            });
        }
    }
    FollowValidators.Create = Create;
})(FollowValidators = exports.FollowValidators || (exports.FollowValidators = {}));
//# sourceMappingURL=FollowValidators.js.map