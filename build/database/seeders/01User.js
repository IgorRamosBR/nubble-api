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
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UserSeeder extends Seeder_1.default {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.default.createMany([
                {
                    firstName: 'Maria',
                    lastName: 'Julia',
                    username: 'mariajulia',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/1-maria.png',
                    email: 'mariajulia@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Tamires',
                    lastName: 'Silva',
                    username: 'tami_silva',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/4-tamires.png',
                    email: 'tsilva@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Ana',
                    lastName: 'Oliveira',
                    username: 'aninha23',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/7-ana.png',
                    email: 'oliveiraana23@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Marcelo',
                    lastName: 'Tavares',
                    username: 'celotavares',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/6-marcelo.png',
                    email: 'celotavares@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Vanessa',
                    lastName: 'Isidório',
                    username: 'vanessa_isidorio',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/9-vanessa.png',
                    email: 'vanessa123@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Samuel',
                    lastName: 'Vilar',
                    username: 'samuelvilar',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/5-samuel.png',
                    email: 'samu.vilar@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Mateus',
                    lastName: 'de Souza',
                    username: 'mateussouza',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/8-mateus.png',
                    email: 'msouza@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Gabriel',
                    lastName: 'Lemos',
                    username: 'glemos',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/3-gabriel.png',
                    email: 'glemos@coffstack.com',
                    password: 'supersecret',
                },
                {
                    firstName: 'Carla',
                    lastName: 'Santos',
                    username: 'carlasantos',
                    profileURL: 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/2-carla.png',
                    email: 'carlasantos@coffstack.com',
                    password: 'supersecret',
                },
            ]);
        });
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=01User.js.map