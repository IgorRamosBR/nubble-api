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
const UserValidator_1 = global[Symbol.for('ioc.use')]("App/Validators/UserValidator");
const AuthorizationException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Shared/Exceptions/AuthorizationException"));
const UsersRepository_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Repositories/UsersRepository"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const crypto_1 = __importDefault(require("crypto"));
const generate_password_1 = __importDefault(require("generate-password"));
const date_fns_1 = require("date-fns");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class AuthController {
    login({ request, auth, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDto = yield request.validate({ schema: UserValidator_1.LoginSchema });
                const rememberMe = userDto.rememberMe === undefined ? true : userDto.rememberMe;
                const jwt = yield auth
                    .use('jwt')
                    .attempt(userDto.email, userDto.password, rememberMe ? {
                    expiresIn: Env_1.default.get('TOKEN_EXPIRES_IN') || '30m',
                    refreshTokenExpiresIn: Env_1.default.get('REFRESH_TOKEN_EXPIRES_IN') || '30d'
                } : {
                    expiresIn: '10m',
                    refreshTokenExpiresIn: '10d'
                });
                const user = auth.use('jwt').user;
                const userPayload = yield this.generateRememberToken(user, jwt);
                return response.json({ auth: jwt, user: userPayload });
            }
            catch (error) {
                throw new AuthorizationException_1.default('Unable to login, please check your credentials or try again later.');
            }
        });
    }
    logout({ auth, response }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = auth.use('jwt').user;
                yield auth.use('jwt').revoke({
                    refreshToken: (_a = user === null || user === void 0 ? void 0 : user.rememberMeToken) !== null && _a !== void 0 ? _a : '',
                });
                this.generateRememberToken(user, null);
                yield Database_1.default.from('jwt_tokens').where('user_id', user.id).delete();
                auth.use('jwt').isLoggedOut;
                return response.json({ message: 'Logout successfully' });
            }
            catch (error) {
                throw new AuthorizationException_1.default('Unable to logout, please try again later.');
            }
        });
    }
    isUsernameAvailable({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = request.input('username');
                if (!username) {
                    return response.status(400).json({ message: 'username is required' });
                }
                const existingUser = yield User_1.default.findBy('username', username);
                if (existingUser) {
                    return response.status(200).json({ message: 'username is not available', isAvailable: false });
                }
                else {
                    username;
                    return response.status(200).json({ message: 'username is available', isAvailable: true });
                }
            }
            catch (error) {
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    isEmailAvailable({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = request.input('email');
                if (!email) {
                    return response.status(400).json({ message: 'email is required' });
                }
                const existingUser = yield User_1.default.findBy('email', email);
                if (existingUser) {
                    return response.status(200).json({ message: 'email is not available', isAvailable: false });
                }
                else {
                    email;
                    return response.status(200).json({ message: 'email is available', isAvailable: true });
                }
            }
            catch (error) {
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    register({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = yield request.validate({ schema: UserValidator_1.StoreUserSchema });
            const usersRepository = new UsersRepository_1.default();
            const user = yield usersRepository.store(userDto);
            return response.json(user);
        });
    }
    forgotPassword({ request, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDto = yield request.validate({ schema: UserValidator_1.ForgotPasswordSchema });
                const user = yield User_1.default.findBy('email', userDto.email);
                if (!user) {
                    return response.status(401).json({ errors: [{ message: 'User not found' }] });
                }
                const tempToken = crypto_1.default.randomBytes(10).toString('hex');
                const pass = generate_password_1.default.generate({
                    length: 10,
                    numbers: true,
                });
                const encodedEmail = Buffer.from(user.email).toString('base64');
                const encodedPasswordTemp = Buffer.from(pass).toString('base64');
                user.temp_token = tempToken;
                user.temp_password = encodedPasswordTemp;
                user.temp_token_created_at = new Date();
                yield user.save();
                const emailTo = Env_1.default.get('MAIL_SEND_TEST') === 'true'
                    ? Env_1.default.get('MAIL_SEND_TEST_TO')
                    : user.email;
                yield Mail_1.default.send((message) => {
                    message
                        .from(Env_1.default.get('MAIL_SENDER'))
                        .to(emailTo)
                        .subject('Forgot Password!')
                        .htmlView('emails/forgot_password', {
                        user: {
                            fullName: user.full_name,
                            password: pass
                        },
                        url: `${Env_1.default.get('RESET_PASSWORD_URL')}/${tempToken}/${encodedEmail}`,
                    });
                });
                return response.status(200).json({ message: 'Token sent to your email' });
            }
            catch (error) {
                return response.status(400).json({ errors: [{ message: 'Error to request new token' }] });
            }
        });
    }
    resetPassword({ params, response }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tempToken, email } = params;
                const emailToString = atob(email);
                const user = yield User_1.default.findBy('email', emailToString);
                if (!user) {
                    return response.status(401).json({ errors: [{ message: 'User not found' }] });
                }
                const sameToken = tempToken === user.temp_token;
                if (!sameToken) {
                    return response
                        .status(401)
                        .json({ errors: [{ message: 'Token not found' }] });
                }
                const dateToCompare = (0, date_fns_1.addHours)(user.temp_token_created_at, 3);
                const isExpiredToken = (0, date_fns_1.isAfter)(new Date(), dateToCompare);
                if (isExpiredToken) {
                    return response.status(401).json({ errors: [{ message: 'Token expired' }] });
                }
                user.password = user.temp_password ? atob(user.temp_password) : user.password;
                user.temp_password = null;
                user.temp_token = null;
                user.temp_token_created_at = null;
                yield user.save();
                return response.status(200).json({ message: 'Password changed successfully' });
            }
            catch (error) {
                return response.status(400).json({ errors: [{ message: 'User not found' }] });
            }
        });
    }
    editPassword({ request, auth, response }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = yield request.validate({ schema: UserValidator_1.EditPasswordSchema });
            const user = yield User_1.default.findBy('id', (_a = auth.user) === null || _a === void 0 ? void 0 : _a.id);
            if (!user) {
                return response.status(401).json({ errors: [{ message: 'User not found' }] });
            }
            const currentPasswordIsValid = yield Hash_1.default.verify(user.password, userDto.currentPassword);
            if (!currentPasswordIsValid) {
                return response.status(400).json({ errors: [{ message: 'Current password is wrong' }] });
            }
            const newsIsEqualsToCurrent = yield Hash_1.default.verify(user.password, userDto.newPassword);
            if (newsIsEqualsToCurrent) {
                return response.status(400).json({ errors: [{ message: 'New password is equal to current password' }] });
            }
            user.password = userDto.newPassword;
            yield user.save();
            return response.status(200).json({ message: 'Password changed successfully' });
        });
    }
    refreshToken({ auth, response, request }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = request.input("refreshToken");
                const jwt = yield auth.use('jwt').loginViaRefreshToken(refreshToken, {
                    expiresIn: Env_1.default.get('TOKEN_EXPIRES_IN') || '30m',
                    refreshTokenExpiresIn: Env_1.default.get('REFRESH_TOKEN_EXPIRES_IN') || '30d'
                });
                const user = auth.use('jwt').user;
                const userPayload = yield this.generateRememberToken(user, jwt);
                return response.json({ auth: jwt, user: userPayload });
            }
            catch (error) {
                throw new AuthorizationException_1.default('Unable to refresh token, please try again later.');
            }
        });
    }
    generateRememberToken(user, jwt) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            user.rememberMeToken = (_a = jwt === null || jwt === void 0 ? void 0 : jwt.toJSON().refreshToken.toString()) !== null && _a !== void 0 ? _a : null;
            user.save();
            return user;
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map