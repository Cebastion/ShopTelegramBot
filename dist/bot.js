"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_class_1 = require("./class/bot.class");
const config_service_1 = require("./config/config.service");
const parser_service_1 = require("./parser/service/parser.service");
const parser = new parser_service_1.ParserService();
parser.GetGames(1).then((game_list) => {
    const bot = new bot_class_1.Bot(new config_service_1.ConfigService(), game_list);
    bot.start();
});
