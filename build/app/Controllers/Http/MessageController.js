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
const Message_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Message"));
class MessageController {
    index({ response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield Message_1.default.all();
            return response.json(messages);
        });
    }
    show({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.default.findOrFail(params.id);
            return response.json(message);
        });
    }
    store({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.only(['sender_id', 'recipient_id', 'message']);
            const message = yield Message_1.default.create(data);
            return response.status(201).json(message);
        });
    }
    update({ params, request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.default.findOrFail(params.id);
            const data = request.only(['sender_id', 'recipient_id', 'message']);
            message.merge(data);
            yield message.save();
            return response.json(message);
        });
    }
    destroy({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.default.findOrFail(params.id);
            yield message.delete();
            return response.json({ message: 'Message deleted successfully' });
        });
    }
}
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map