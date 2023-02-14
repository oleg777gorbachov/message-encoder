"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateCode(length) {
    const res = [];
    for (let i = 0; i < length; i++) {
        res.push(String.fromCharCode(Math.round(Math.random() * 25) + 65));
    }
    return res.join("");
}
exports.default = generateCode;
