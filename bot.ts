import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'

const bot = new Bot(new ConfigService())
bot.start()

/*

bot.action('btn-1', (ctx) => {
  ctx.deleteMessage()

  ctx.replyWithPhoto({url: ''}, {reply_markup: {
    inline_keyboard: [
      [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }]
    ]
  }})
})

bot.action('prev', (ctx) => {
  ctx.deleteMessage()

  ctx.replyWithPhoto({url: ''}, {reply_markup: {
    inline_keyboard: [
      [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }]
    ]
  }})
})

bot.action('next', (ctx) => {
  ctx.deleteMessage()

  ctx.replyWithPhoto({url: ''}, {reply_markup: {
    inline_keyboard: [
      [{ text: 'Prev Game', callback_data: 'prev' }, { text: 'Next Game', callback_data: 'next' }]
    ]
  }})
})

*/