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
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class RefreshTokenMiddleware {
    handle({ auth, request, response }, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield next();
            }
            catch (error) {
                if (error.code === 'E_UNAUTHORIZED_ACCESS') {
                    let refreshToken = request.header('authorization');
                    refreshToken = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.slice(7);
                    if (!refreshToken) {
                        return response.unauthorized({ message: 'Token não informado' });
                    }
                    try {
                        const { data: jwtData } = (0, jwt_decode_1.default)(refreshToken);
                        const userData = yield User_1.default.find(jwtData.userId);
                        if (!userData) {
                            return response.unauthorized({ message: 'Usuário não encontrado' });
                        }
                        if (userData.rememberMeToken) {
                            const jwt = yield auth.use('jwt').loginViaRefreshToken(userData.rememberMeToken, {
                                expiresIn: Env_1.default.get('TOKEN_EXPIRES_IN') || '30m',
                                refreshTokenExpiresIn: Env_1.default.get('REFRESH_TOKEN_EXPIRES_IN') || '30d'
                            });
                            const user = auth.use('jwt').user;
                            user.rememberMeToken = (_a = jwt === null || jwt === void 0 ? void 0 : jwt.toJSON().refreshToken.toString()) !== null && _a !== void 0 ? _a : null;
                            yield user.save();
                            return response.ok({ auth: jwt, user });
                        }
                    }
                    catch (error) {
                        return response.unauthorized({ message: 'Token inválido ou expirado' });
                    }
                }
                else {
                    throw error;
                }
            }
        });
    }
}
exports.default = RefreshTokenMiddleware;
//# sourceMappingURL=RefreshTokenMiddleware.js.map