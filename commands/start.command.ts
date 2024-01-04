import { Command } from '../class/command.class'
import { Telegraf } from 'telegraf'

export class StartCommand extends Command {
  constructor(bot: Telegraf<any>) {
    super(bot)
  }

  handle(): void {
    this.bot.start((ctx) => {
      const user = ctx.message.from.username
      ctx.reply(`Welcome ${user} to GameShop! \nSo, start search game?`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Yes!', callback_data: 'btn-1' }, { text: 'No!', callback_data: 'btn-2' }]
          ]
        }
      })
    })
  }
}