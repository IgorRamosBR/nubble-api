"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostSchema = exports.ValidateImageSchema = exports.StorePostSchema = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
exports.StorePostSchema = Validator_1.schema.create({
    text: Validator_1.schema.string({ escape: true, trim: true }),
});
exports.ValidateImageSchema = Validator_1.schema.create({
    imageCover: Validator_1.schema.file({
        size: '10mb',
        extnames: ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'webp', 'WEBP']
    }),
});
exports.EditPostSchema = Validator_1.schema.create({
    text: Validator_1.schema.string({ escape: true, trim: true }),
});
//# sourceMappingURL=PostValidator.js.map