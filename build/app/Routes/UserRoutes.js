"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'UsersController.list');
    Route_1.default.get('/:id', 'UsersController.get').as('users.get');
    Route_1.default.put('/', 'UsersController.edit').as('users.edit');
})
    .prefix('/users')
    .middleware(['auth']);
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.get('/following', 'FollowController.listFollowing').as('user.listFollowing');
        Route_1.default.get('/followers', 'FollowController.listFollower').as('user.listFollower');
        Route_1.default.post('/', 'FollowController.storeFollower').as('user.storeFollower');
        Route_1.default.delete('/:id', 'FollowController.deleteFollower').as('user.deleteFollower');
    })
        .prefix('/follow');
})
    .prefix('/user')
    .middleware(['auth']);
Route_1.default.group(() => {
    Route_1.default.post('/register', 'AuthController.register').as('auth.register');
    Route_1.default.post('/login', 'AuthController.login').as('auth.login');
    Route_1.default.post('/forgot-password', 'AuthController.forgotPassword').as('auth.forgotPassword');
    Route_1.default.get('/reset-password/:tempToken/:email', 'AuthController.resetPassword').as('auth.resetPassword');
    Route_1.default.get('/validate-username', 'AuthController.isUsernameAvailable').as('auth.isUsernameAvailable');
    Route_1.default.get('/validate-email', 'AuthController.isEmailAvailable').as('auth.isEmailAvailable');
    Route_1.default.post('/refresh-token', 'AuthController.refreshToken').as('auth.refreshToken');
    Route_1.default.group(() => {
        Route_1.default.post('/edit-password', 'AuthController.editPassword').as('auth.editPassword');
        Route_1.default.get('/logout', 'AuthController.logout').as('auth.logout');
    })
        .prefix('/profile')
        .middleware(['auth']);
})
    .prefix('/auth');
//# sourceMappingURL=UserRoutes.js.map