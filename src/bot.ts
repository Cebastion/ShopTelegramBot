import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'
import { IGames } from './parser/interface/game.interface'
import { ParserService } from './parser/service/parser.service'

const parser = new ParserService()
parser.GetGames(1).then(async (game_list: IGames) => {
  const bot = new Bot(new ConfigService(), game_list)
  await bot.start()
})