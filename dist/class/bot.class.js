"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const telegraf_1 = require("telegraf");
const start_command_1 = require("../commands/start.command");
const nextgame_command_1 = require("../commands/nextgame.command");
const prevgame_command_1 = require("../commands/prevgame.command");
const buy_command_1 = require("../commands/buy.command");
class Bot {
    configService;
    game_list;
    bot;
    commands = [];
    games;
    constructor(configService, game_list) {
        this.configService = configService;
        this.game_list = game_list;
        this.bot = new telegraf_1.Telegraf(this.configService.get("TOKEN"));
        this.bot.use((0, telegraf_1.session)());
        this.games = this.game_list;
    }
    start() {
        this.commands = [new start_command_1.StartCommand(this.bot, this.games), new nextgame_command_1.NextGameCommand(this.bot, this.games), new prevgame_command_1.PrevGameCommand(this.bot, this.games), new buy_command_1.BuyCommand(this.bot, this.games, this.configService)];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}
exports.Bot = Bot;
