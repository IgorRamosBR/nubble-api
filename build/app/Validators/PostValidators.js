"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidators = void 0;
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
var PostValidators;
(function (PostValidators) {
    class Store {
        constructor() {
            this.schema = Validator_1.schema.create({
                text: Validator_1.schema.string.optional({ trim: true }, []),
                timeline_category_id: Validator_1.schema.number.optional(),
                contents: Validator_1.schema.array().members(Validator_1.schema.object().members({
                    content_url: Validator_1.schema.string({}, []),
                    content_thumb_url: Validator_1.schema.string.optional({}, []),
                    width: Validator_1.schema.number.optional([]),
                    height: Validator_1.schema.number.optional([]),
                    type: Validator_1.schema.enum(['video', 'image']),
                    subtype: Validator_1.schema.string.optional({ trim: true }, []),
                })),
            });
        }
    }
    PostValidators.Store = Store;
    class Update {
        constructor() {
            this.schema = Validator_1.schema.create({
                text: Validator_1.schema.string.optional(),
                contents: Validator_1.schema.array.optional().members(Validator_1.schema.object().members({
                    id: Validator_1.schema.number.optional(),
                    content_url: Validator_1.schema.string(),
                    content_thumb_url: Validator_1.schema.string.optional(),
                    width: Validator_1.schema.number.optional(),
                    height: Validator_1.schema.number.optional(),
                    type: Validator_1.schema.enum(['video', 'image']),
                    subtype: Validator_1.schema.string.optional(),
                })),
            });
        }
    }
    PostValidators.Update = Update;
    function Integer(id) {
        return {
            schema: Schemas.Integer,
            data: { id: Number(id) },
            messages: {
                number: 'Parâmetro invalido',
                exists: 'Postagem está inacessível ou desativada.',
            },
        };
    }
    PostValidators.Integer = Integer;
    let Schemas;
    (function (Schemas) {
        Schemas.Integer = Validator_1.schema.create({
            id: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.exists({ table: 'posts', column: 'id', whereNot: { is_deleted: true } }),
            ]),
        });
        Schemas.UUID = Validator_1.schema.create({
            id: Validator_1.schema.string.optional({ trim: true, escape: true }, [
                Validator_1.rules.uuid({ version: '4' }),
                Validator_1.rules.exists({ table: 'posts', column: 'id', whereNot: { is_deleted: true } }),
                Validator_1.rules.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            ]),
        });
    })(Schemas = PostValidators.Schemas || (PostValidators.Schemas = {}));
})(PostValidators = exports.PostValidators || (exports.PostValidators = {}));
//# sourceMappingURL=PostValidators.js.map