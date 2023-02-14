"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bytes = +process.env.BYTES;
const algorithm = process.env.ALGORITM;
const secretkey = process.env.SECRET_KEY;
const encrypt = (message) => {
    const iv = crypto_1.default.randomBytes(bytes);
    const cipher = crypto_1.default.createCipheriv(algorithm, secretkey, iv);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
};
const decrypt = (hash) => {
    const decipher = crypto_1.default.createDecipheriv(algorithm, secretkey, Buffer.from(hash.iv, "hex"));
    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
    ]);
    return decrpyted.toString();
};
exports.default = { decrypt, encrypt };
