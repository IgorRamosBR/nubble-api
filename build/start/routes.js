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
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const HealthCheck_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HealthCheck"));
const adonis_autoswagger_1 = __importDefault(require("adonis-autoswagger"));
const swagger_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/swagger"));
Route_1.default.get('/health', ({ response }) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield HealthCheck_1.default.getReport();
    return report.healthy ? response.ok(report) : response.badRequest(report);
}));
global[Symbol.for('ioc.use')]("App/Routes/UserRoutes");
global[Symbol.for('ioc.use')]("App/Routes/PostRoutes");
global[Symbol.for('ioc.use')]("App/Routes/MessageRoutes");
Route_1.default.get('/', () => {
    return 'Hello world';
});
Route_1.default.get('/swagger', () => __awaiter(void 0, void 0, void 0, function* () {
    return adonis_autoswagger_1.default.docs(Route_1.default.toJSON(), swagger_1.default);
}));
Route_1.default.get('/docs', () => __awaiter(void 0, void 0, void 0, function* () {
    return adonis_autoswagger_1.default.ui('/swagger');
}));
//# sourceMappingURL=routes.js.map