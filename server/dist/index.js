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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const GlobalRoutes_1 = __importDefault(require("./src/routes/GlobalRoutes"));
const App = (0, express_1.default)();
dotenv_1.default.config();
App.use(express_1.default.json());
App.use((0, cors_1.default)({ origin: true }));
App.use(express_1.default.urlencoded({ extended: true }));
const url = process.env.DATABASE_URL;
const port = process.env.SERVER_PORT;
(0, GlobalRoutes_1.default)(App);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url || !port) {
            throw new Error("Don't valid data");
        }
        try {
            mongoose_1.default.set("strictQuery", false);
            yield mongoose_1.default.connect(url).then((e) => console.log("connected"));
            App.listen(port);
        }
        catch (error) {
            console.log(error);
            if (typeof error === "string")
                throw new Error(error);
            else
                throw new Error("can't start serer");
        }
    });
}
start();
