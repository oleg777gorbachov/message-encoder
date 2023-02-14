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
const messageDto_1 = __importDefault(require("../dto/messageDto"));
const message_1 = __importDefault(require("../models/message"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateCode_1 = __importDefault(require("../utils/generateCode"));
const hashing_1 = __importDefault(require("../utils/hashing"));
const { encrypt } = hashing_1.default;
class messagesController {
    patches() {
        return {
            read: "/messages/read",
            create: "/messages/create",
            check: "/messages/check",
            change: "/messages/change",
        };
    }
    change(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, code, password } = req.body;
                if (!message || !code) {
                    return res.status(403).json({ message: "don't valid data" });
                }
                const messageDB = yield message_1.default.findOne({ code });
                if (!messageDB) {
                    return res.status(403).json({ message: "don't exist" });
                }
                let isCheck = false;
                if (typeof password === "string") {
                    isCheck = yield bcrypt_1.default.compare(password, messageDB.password);
                }
                else {
                    isCheck = yield bcrypt_1.default.compare(process.env.PASSWORD_MESSAGE_DEFAULT, messageDB.password);
                }
                if (!isCheck) {
                    return res.status(403).json({ message: "wrong password" });
                }
                messageDB.message = encrypt(message);
                yield messageDB.save();
                const dto = (0, messageDto_1.default)(messageDB);
                return res.json(dto);
            }
            catch (error) {
                console.log(error);
                return res.status(403).json({ message: "Something wen't wrong" });
            }
        });
    }
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.query;
                if (!code) {
                    return res.status(403).json({ message: "don't valid data" });
                }
                const message = yield message_1.default.findOne({ code });
                if (!message) {
                    return res.status(403).json({ exist: false, password: false });
                }
                const password = yield bcrypt_1.default.compare(process.env.PASSWORD_MESSAGE_DEFAULT, message.password);
                return res.json({ exist: true, password });
            }
            catch (error) {
                return res.status(403).json({ message: "Something wen't wrong" });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, password } = req.query;
                if (!code) {
                    return res.status(403).json({ message: "don't valid data" });
                }
                const message = yield message_1.default.findOne({ code });
                if (!message) {
                    return res.status(403).json({ message: "can't find message" });
                }
                let isCheck = false;
                if (typeof password === "string") {
                    isCheck = yield bcrypt_1.default.compare(password, message.password);
                }
                else {
                    isCheck = yield bcrypt_1.default.compare(process.env.PASSWORD_MESSAGE_DEFAULT, message.password);
                }
                if (!isCheck) {
                    return res.status(403).json({ message: "wrong password" });
                }
                message.views = message.views + 1;
                yield message.save();
                console.log(message.views);
                if (message.maxViews <= message.views) {
                    console.log("deleted");
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield message.delete();
                    }), 100);
                }
                const dto = (0, messageDto_1.default)(message);
                return res.json(dto);
            }
            catch (error) {
                return res.status(403).json({ message: "Something wen't wrong" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, password, author, isEditableByOther, views } = req.body;
                if (!message) {
                    return res.status(403).json({ message: "don't valid data" });
                }
                const salt = yield bcrypt_1.default.genSalt(+process.env.MESSAGE_SALT);
                const passwordHash = yield bcrypt_1.default.hash(password || process.env.PASSWORD_MESSAGE_DEFAULT, salt);
                const messageHash = encrypt(message);
                let code = (0, generateCode_1.default)(6);
                let isCodeExist = true;
                while (isCodeExist) {
                    const codeData = yield message_1.default.findOne({ code });
                    if (!codeData)
                        isCodeExist = false;
                }
                const messageData = yield message_1.default.create({
                    author: author.length > 0 ? author : "Unknown",
                    isEditableByOther,
                    message: messageHash,
                    password: passwordHash,
                    maxViews: views,
                    code,
                    date: new Date().getTime(),
                });
                const dto = (0, messageDto_1.default)(messageData);
                console.log(dto);
                return res.json(dto);
            }
            catch (error) {
                console.log(error);
                return res.status(403).json({ message: "Something wen't wrong" });
            }
        });
    }
}
exports.default = { messagesController: new messagesController() };
