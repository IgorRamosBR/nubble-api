"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/list', 'MessageController.index');
    Route_1.default.get('/:id', 'MessageController.show');
    Route_1.default.post('', 'MessageController.store');
    Route_1.default.put('/:id', 'MessageController.update');
    Route_1.default.delete('/:id', 'MessageController.destroy');
})
    .middleware(['auth'])
    .prefix('/messages');
//# sourceMappingURL=MessageRoutes.js.map