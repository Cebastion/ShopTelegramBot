import { Telegraf } from 'telegraf'
import { Command } from '../class/command.class'
import { IBotContext, SessionData } from '../context/context.interface'
import { IGames } from '../parser/interface/game.interface'

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>, games: Promise<IGames>) {
    super(bot, games)
  }

  handle(): void {
    this.bot.start((ctx) => {
      const user = ctx.message.from.username
      ctx.reply(`Welcome ${user} to GameShop! \nSo, start search game?`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Let`s go!', callback_data: 'start' }]
          ]
        }
      })
    })

    this.bot.action('start', async (ctx) => {
      if (!ctx.session) {
        ctx.session = {} as SessionData
      }
      ctx.session.currentGame = 0
      const game = (await this.games).games[ctx.session.currentGame]
      ctx.deleteMessage()

      ctx.replyWithPhoto({ url: game.game.Image }, {
        caption: `Name: ${game.game.Name} \nCategory: ${game.game.Tag}`, reply_markup: {
          inline_keyboard: [
            [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }],
            [{ text: `Buy for ${game.game.Price}`, callback_data: 'buy' }]
          ]
        }
      })
    })
  }
}