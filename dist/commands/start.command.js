"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_class_1 = require("../class/command.class");
class StartCommand extends command_class_1.Command {
    constructor(bot, games) {
        super(bot, games);
    }
    handle() {
        this.bot.start((ctx) => {
            const user = ctx.message.from.username;
            ctx.reply(`Welcome ${user} to GameShop! \nSo, start search game?`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Let`s go!', callback_data: 'start' }]
                    ]
                }
            });
        });
        this.bot.action('start', (ctx) => {
            if (!ctx.session) {
                ctx.session = {};
            }
            ctx.session.currentGame = 0;
            const game = this.games.games[ctx.session.currentGame];
            ctx.deleteMessage();
            ctx.replyWithPhoto({ url: game.game.Image }, { caption: `Name: ${game.game.Name} \nCategory: ${game.game.Tag}`, reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }],
                        [{ text: `Buy for ${game.game.Price}`, callback_data: 'buy' }]
                    ]
                } });
        });
    }
}
exports.StartCommand = StartCommand;
