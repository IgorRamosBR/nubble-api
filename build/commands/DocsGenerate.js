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
const standalone_1 = require("@adonisjs/core/build/standalone");
const adonis_autoswagger_1 = __importDefault(require("adonis-autoswagger"));
const swagger_1 = __importDefault(require("../config/swagger"));
class DocsGenerate extends standalone_1.BaseCommand {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const Router = yield this.application.container.use('Adonis/Core/Route');
            Router.commit();
            yield adonis_autoswagger_1.default.writeFile(yield Router.toJSON(), swagger_1.default);
        });
    }
}
exports.default = DocsGenerate;
DocsGenerate.commandName = 'docs:generate';
DocsGenerate.description = '';
DocsGenerate.settings = {
    loadApp: true,
    stayAlive: false,
};
//# sourceMappingURL=DocsGenerate.js.map