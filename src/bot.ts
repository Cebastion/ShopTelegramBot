import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'

const bot = new Bot(new ConfigService())
bot.start()