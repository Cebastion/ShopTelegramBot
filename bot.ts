import { Telegraf } from 'telegraf'
import sanitizedConfig from './config/config'

const bot = new Telegraf(sanitizedConfig.TOKEN)

bot.start((ctx) => {
  const user = ctx.message.from.username
  ctx.reply(`Hi ${user}`)
})

bot.launch()