import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'
import { IGames } from './parser/interface/game.interface'
import { ParserService } from './parser/service/parser.service'

const parser =  new ParserService()
parser.GetGames(1).then((game_list: IGames) => {
  const bot = new Bot(new ConfigService(), game_list)
  bot.start()
})