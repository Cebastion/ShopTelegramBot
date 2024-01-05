import { Bot } from './class/bot.class'
import { ConfigService } from './config/config.service'
import { IGames } from './parser/interface/game.interface'
import { ParserService } from './parser/service/parser.service'
import  express, {Request, Response}  from 'express'

const app = express()

const parser = new ParserService()
parser.GetGames(1).then((game_list: IGames) => {
  const bot = new Bot(new ConfigService(), game_list)
  bot.start()
})

app.get('/', (req: Request, res: Response) => {
  res.send("Hello Bot")
})

app.listen(5000, () => {
  console.log("Bot Work!")
})