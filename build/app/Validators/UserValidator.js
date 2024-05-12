"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPasswordSchema = exports.ForgotPasswordSchema = exports.LoginSchema = exports.EditUserSchema = exports.StoreUserSchema = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
exports.StoreUserSchema = Validator_1.schema.create({
    firstName: Validator_1.schema.string({ escape: true, trim: true }, [
        Validator_1.rules.minLength(4),
        Validator_1.rules.maxLength(80),
    ]),
    lastName: Validator_1.schema.string({ escape: true, trim: true }, [Validator_1.rules.minLength(4), Validator_1.rules.maxLength(80)]),
    username: Validator_1.schema.string({ escape: true, trim: true }, [
        Validator_1.rules.requiredIfNotExists('username'),
        Validator_1.rules.unique({ table: 'users', column: 'username', whereNot: { is_deleted: true } }),
    ]),
    email: Validator_1.schema.string({ escape: true, trim: true }, [
        Validator_1.rules.email(),
        Validator_1.rules.requiredIfNotExists('email'),
        Validator_1.rules.unique({ table: 'users', column: 'email', whereNot: { is_deleted: true } }),
    ]),
    password: Validator_1.schema.string({ escape: true, trim: true }, [Validator_1.rules.minLength(4)]),
});
exports.EditUserSchema = Validator_1.schema.create({
    firstName: Validator_1.schema.string.optional({ escape: true, trim: true }, [
        Validator_1.rules.minLength(4),
        Validator_1.rules.maxLength(80),
    ]),
    lastName: Validator_1.schema.string.optional({ escape: true, trim: true }, [
        Validator_1.rules.minLength(4),
        Validator_1.rules.maxLength(80),
    ]),
    username: Validator_1.schema.string.optional({ escape: true, trim: true }, [
        Validator_1.rules.unique({ table: 'users', column: 'username', whereNot: { is_deleted: true } }),
    ]),
});
exports.LoginSchema = Validator_1.schema.create({
    email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
    password: Validator_1.schema.string({ trim: true }),
    rememberMe: Validator_1.schema.boolean.optional(),
});
exports.ForgotPasswordSchema = Validator_1.schema.create({
    email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
});
exports.EditPasswordSchema = Validator_1.schema.create({
    currentPassword: Validator_1.schema.string({ trim: true }),
    newPassword: Validator_1.schema.string({ trim: true }, [Validator_1.rules.minLength(8)]),
});
//# sourceMappingURL=UserValidator.js.map