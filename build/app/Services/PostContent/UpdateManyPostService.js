"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyPostService = void 0;
const tsyringe_1 = require("tsyringe");
let UpdateManyPostService = class UpdateManyPostService {
    constructor(postContentRepository) {
        this.postContentRepository = postContentRepository;
    }
    run(contentsDto) {
        var _a, contentsDto_1, contentsDto_1_1;
        var _b, e_1, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (_a = true, contentsDto_1 = __asyncValues(contentsDto); contentsDto_1_1 = yield contentsDto_1.next(), _b = contentsDto_1_1.done, !_b;) {
                    _d = contentsDto_1_1.value;
                    _a = false;
                    try {
                        const contentDto = _d;
                        if (contentDto.id) {
                            const content = yield this.postContentRepository.findBy('id', contentDto.id);
                            if (!content || content.post_id !== contentDto.post_id)
                                throw new Error('Not found content with this id or content is not available.');
                            content.merge(contentDto);
                            yield this.postContentRepository.update(content);
                        }
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = contentsDto_1.return)) yield _c.call(contentsDto_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
};
UpdateManyPostService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('PostContentRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateManyPostService);
exports.UpdateManyPostService = UpdateManyPostService;
//# sourceMappingURL=UpdateManyPostService.js.map