import { Telegraf } from 'telegraf'
import { IConfigService } from '../config/config.interface'
import { Command } from './command.class'
import { StartCommand } from '../commands/start.command'
import { NextGameCommand } from '../commands/nextgame.command'
import { PrevGameCommand } from '../commands/prevgame.command'

class Bot {
  private bot: Telegraf<any>
  private commands: Command[] = []

  constructor(private readonly configService: IConfigService){
    this.bot = new Telegraf<any>(this.configService.get("TOKEN"))
  }

  start(){
    this.commands = [new StartCommand(this.bot), new NextGameCommand(this.bot), new PrevGameCommand(this.bot)]
    for(const command of this.commands){
      command.handle()
    }
    this.bot.launch()
  }
}

export { Bot }