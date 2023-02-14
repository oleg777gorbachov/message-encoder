"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashing_1 = __importDefault(require("../utils/hashing"));
const { decrypt, encrypt } = hashing_1.default;
function messageDto(message) {
    const _a = message._doc, { _id, __v, message: messageHash, password } = _a, messageData = __rest(_a, ["_id", "__v", "message", "password"]);
    const messageDecrypt = decrypt(messageHash);
    return Object.assign(Object.assign({}, messageData), { id: _id, message: messageDecrypt });
}
exports.default = messageDto;
