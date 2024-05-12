"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('post', 'PostsController.index').as('post.user.list');
    Route_1.default.get('post/:id', 'PostsController.show').as('post.user.get');
    Route_1.default.post('post', 'PostsController.store').as('post.user.store');
    Route_1.default.put('post/:id', 'PostsController.edit').as('post.user.save');
    Route_1.default.delete('post/:id', 'PostsController.destroy').as('post.user.delete');
    Route_1.default.group(() => {
        Route_1.default.get('/', 'PostReactionController.index');
        Route_1.default.get('/my-reactions', 'PostReactionController.myReactions');
        Route_1.default.post('/:postId/:emojiType', 'PostReactionController.storeUpdate');
        Route_1.default.delete('/:postId/:emojiType', 'PostReactionController.destroy');
    })
        .prefix('/reactions');
    Route_1.default.post('post_comment', 'PostCommentController.store');
    Route_1.default.get('post_comment', 'PostCommentController.index');
    Route_1.default.delete('post_comment/:commentId', 'PostCommentController.destroy');
    Route_1.default.put('post_comment/:commentId', 'PostCommentController.update');
    Route_1.default.get('post_comment/:commentId', 'PostCommentController.show');
})
    .prefix('user')
    .middleware(['auth']);
//# sourceMappingURL=PostRoutes.js.map