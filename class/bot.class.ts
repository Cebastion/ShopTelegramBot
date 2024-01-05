import { Telegraf, session } from 'telegraf'
import { IConfigService } from '../config/config.interface'
import { Command } from './command.class'
import { StartCommand } from '../commands/start.command'
import { NextGameCommand } from '../commands/nextgame.command'
import { PrevGameCommand } from '../commands/prevgame.command'
import { IGames } from '../parser/interface/game.interface'
import { BuyCommand } from '../commands/buy.command'
import { IBotContext } from '../context/context.interface'

class Bot {
  private bot: Telegraf<IBotContext>
  private commands: Command[] = []
  private games: IGames

  constructor(private readonly configService: IConfigService, private readonly game_list: IGames){
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.bot.use(session())
    this.games = this.game_list
  }

  start(){
    this.commands = [new StartCommand(this.bot, this.games), new NextGameCommand(this.bot, this.games), new PrevGameCommand(this.bot, this.games), new BuyCommand(this.bot, this.games, this.configService)]
    for(const command of this.commands){
      command.handle()
    }
    this.bot.launch()
  }
}

export { Bot }