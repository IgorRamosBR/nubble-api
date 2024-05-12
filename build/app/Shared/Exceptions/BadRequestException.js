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
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
class BadRequestException extends standalone_1.Exception {
    constructor(message, status = 400) {
        super(message, status);
    }
    handle(error, { response }) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(error.status).json({ message: this.message, status: this.status });
        });
    }
}
exports.default = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map