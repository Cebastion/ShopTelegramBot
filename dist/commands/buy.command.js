"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyCommand = void 0;
const command_class_1 = require("../class/command.class");
class BuyCommand extends command_class_1.Command {
    configService;
    TOKEN_PAYMENT;
    constructor(bot, games, configService) {
        super(bot, games);
        this.configService = configService;
        this.TOKEN_PAYMENT = this.configService.get("TOKEN_PAYMENT");
    }
    handle() {
        const getInvoice = (id, game) => {
            let priceInCents = parseFloat(game.Price) * 100;
            const invoice = {
                chat_id: id,
                provider_token: this.TOKEN_PAYMENT,
                start_parameter: 'get_access',
                title: game.Name,
                description: game.Name,
                currency: 'USD',
                prices: [{ label: game.Name, amount: priceInCents }],
                photo_url: game.Image,
                photo_width: 500,
                photo_height: 300,
                payload: JSON.stringify({
                    unique_id: `${id}_${Number(new Date())}`,
                    provider_token: this.TOKEN_PAYMENT
                })
            };
            return invoice;
        };
        this.bot.action('buy', (ctx) => {
            const { game } = this.games.games[ctx.session.currentGame];
            return ctx.replyWithInvoice(getInvoice(ctx.from?.id, game));
        });
        this.bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));
        this.bot.on('successful_payment', async (ctx, next) => {
            await ctx.reply('SuccessfulPayment', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Continue!', callback_data: 'next' }]
                    ]
                }
            });
        });
    }
}
exports.BuyCommand = BuyCommand;
