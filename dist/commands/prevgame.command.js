"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrevGameCommand = void 0;
const command_class_1 = require("../class/command.class");
class PrevGameCommand extends command_class_1.Command {
    constructor(bot, games) {
        super(bot, games);
    }
    handle() {
        this.bot.action('prev', (ctx) => {
            ctx.session.currentGame--;
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
exports.PrevGameCommand = PrevGameCommand;
