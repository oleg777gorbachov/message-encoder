"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
function messageRoutes(App) {
    const controller = messagesController_1.default.messagesController;
    App.get(controller.patches().read, controller.read);
    App.get(controller.patches().check, controller.check);
    App.post(controller.patches().create, controller.create);
    App.post(controller.patches().change, controller.change);
}
exports.default = messageRoutes;
