"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
function GlobalRoutes(App) {
    (0, messageRoutes_1.default)(App);
}
exports.default = GlobalRoutes;
