import { Telegraf, session } from 'telegraf'
import { BuyCommand } from '../commands/buy.command'
import { NextGameCommand } from '../commands/nextgame.command'
import { PrevGameCommand } from '../commands/prevgame.command'
import { StartCommand } from '../commands/start.command'
import { IConfigService } from '../config/config.interface'
import { IBotContext } from '../context/context.interface'
import { IGames } from '../parser/interface/game.interface'
import { Command } from './command.class'
import { ParserService } from '../parser/service/parser.service'

class Bot {
  private bot: Telegraf<IBotContext>
  private commands: Command[] = []
  private parser = new ParserService()
  private games: Promise<IGames> = this.parser.GetGames(1)

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.bot.use(session())
  }

  start() {
    this.commands = [new StartCommand(this.bot, this.games), new NextGameCommand(this.bot, this.games), new PrevGameCommand(this.bot, this.games), new BuyCommand(this.bot, this.games, this.configService)]
    for (const command of this.commands) {
      command.handle()
    }
    this.bot.launch({webhook: { domain: 'shop-telegram-bot-eta.vercel.app', port: 3000 }})
  }
}

export { Bot }

