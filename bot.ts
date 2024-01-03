import { Telegraf } from 'telegraf'
import sanitizedConfig from './config/config'

const bot = new Telegraf(sanitizedConfig.TOKEN)

bot.start((ctx) => {
  const user = ctx.message.from.username
  ctx.reply(`Welcome ${user} to GameShop! \nSo, start search game?`, {reply_markup: {
    inline_keyboard: [
      [{ text: 'Yes!', callback_data: 'btn-1' }, { text: 'No!', callback_data: 'btn-2' }]
    ]
  }})
})

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

bot.launch()