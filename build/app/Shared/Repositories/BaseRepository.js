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
const sharp_1 = __importDefault(require("sharp"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
class BaseRepository {
    constructor(orm) {
        this.orm = orm;
    }
    list({ clauses, orders, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = this.orm.query();
            if (clauses)
                Object.entries(clauses).find(([key, value]) => {
                    if (key === 'where')
                        models.where(value);
                    if (key === 'like') {
                        const { column, match } = value;
                        if (column && match)
                            models.where(column, 'LIKE', `%${match}%`);
                    }
                });
            if (orders) {
                for (const { column, direction } of orders)
                    if (column)
                        models.orderBy(String(column), direction ? direction : 'asc');
            }
            return models;
        });
    }
    store(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.create(values);
        });
    }
    storeMany(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.createMany(values);
        });
    }
    save(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return model.save();
        });
    }
    listWithPagination({ page, perPage, clauses, orders, scopes, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = this.orm.query();
            if (clauses)
                Object.entries(clauses).find(([key, value]) => {
                    if (key === 'where')
                        models.where(value);
                    if (key === 'like') {
                        const { column, match } = value;
                        if (column && match)
                            models.where(column, 'LIKE', `%${match}%`);
                    }
                });
            if (scopes)
                models.withScopes(scopes);
            if (orders) {
                for (const { column, direction } of orders)
                    if (column)
                        models.orderBy(String(column), direction ? direction : 'asc');
            }
            return models.paginate(page, perPage);
        });
    }
    findBy(key, value, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.orm.query().where(key, value);
            if (params) {
                const { clauses, orders, scopes } = params;
                if (clauses)
                    Object.entries(clauses).find(([key, value]) => {
                        if (key === 'where')
                            if (value)
                                model.where(value);
                        if (key === 'like') {
                            const { column, match } = value;
                            if (column && match)
                                model.where(column, 'LIKE', `%${match}%`);
                        }
                    });
                if (scopes)
                    model.withScopes(scopes);
                if (orders)
                    for (const { column, direction } of orders)
                        if (column)
                            model.orderBy(String(column), direction ? direction : 'asc');
            }
            return model.first();
        });
    }
    uploadImage(localSave, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = Drive_1.default.use('s3');
            const resizedImageData = yield (0, sharp_1.default)(image.tmpPath).resize(1024).toBuffer();
            return yield s3.put(localSave, resizedImageData, {
                visibility: 'public',
                contentType: `image/${image.extname}`
            })
                .then(() => {
                return s3.getUrl(localSave);
            });
        });
    }
    deleteImage(localSave) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = Drive_1.default.use('s3');
            return yield s3.delete(localSave);
        });
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map