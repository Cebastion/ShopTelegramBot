import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'
import { ParserService } from './parser/service/parser.service'
import { IGames } from './parser/interface/game.interface'

const parser = new ParserService()
parser.GetGames(1).then((game_list: IGames) => {
  const bot = new Bot(new ConfigService(), game_list)
  bot.start()
})
