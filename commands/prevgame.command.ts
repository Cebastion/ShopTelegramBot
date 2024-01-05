import { Telegraf } from 'telegraf'
import { Command } from '../class/command.class'
import { IGames } from '../parser/interface/game.interface'
import { IBotContext } from '../context/context.interface'

export class PrevGameCommand extends Command {
  constructor(bot: Telegraf<IBotContext>, games: IGames) {
    super(bot, games)
  }

  handle(): void {
    this.bot.action('prev', (ctx) => {
      ctx.session.currentGame--
      const game = this.games.games[ctx.session.currentGame]
      ctx.deleteMessage()
    
      ctx.replyWithPhoto({url: game.game.Image}, {caption: `Name: ${game.game.Name} \nCategory: ${game.game.Tag}` ,reply_markup: {
        inline_keyboard: [
          [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }],
          [{text: `Buy for ${game.game.Price}`, callback_data: 'buy'}]
        ]
      }})
    })
  }
}