"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    config;
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error) {
            throw new Error("don't found .env");
        }
        if (!parsed) {
            throw new Error("empty .env");
        }
        this.config = parsed;
    }
    get(key) {
        const res = this.config[key];
        if (!res) {
            throw new Error("don't found key");
        }
        return res;
    }
}
exports.ConfigService = ConfigService;
