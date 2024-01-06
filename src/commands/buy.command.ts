import { Telegraf } from 'telegraf'
import { Command } from '../class/command.class'
import { IConfigService } from '../config/config.interface'
import { IBotContext } from '../context/context.interface'
import { IGame, IGames } from '../parser/interface/game.interface'

export class BuyCommand extends Command {
  private TOKEN_PAYMENT: string
  constructor(bot: Telegraf<IBotContext>, games: Promise<IGames>, readonly configService: IConfigService) {
    super(bot, games)
    this.TOKEN_PAYMENT = this.configService.get("TOKEN_PAYMENT")
  }

  handle(): void {
    const getInvoice = (id: any, game: IGame) => {
      let priceInCents = parseFloat(game.Price) * 100

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
      }

      return invoice
    }

    this.bot.action('buy', async (ctx) => {
      const { game } = (await this.games).games[ctx.session.currentGame]
      return ctx.replyWithInvoice(getInvoice(ctx.from?.id, game))
    })

    this.bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true))

    this.bot.on('successful_payment', async (ctx, next) => {
      await ctx.reply('SuccessfulPayment', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Continue!', callback_data: 'next' }]
          ]
        }
      })
    })
  }
}