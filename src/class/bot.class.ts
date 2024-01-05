import { Telegraf, session } from 'telegraf'
import { BuyCommand } from '../commands/buy.command'
import { NextGameCommand } from '../commands/nextgame.command'
import { PrevGameCommand } from '../commands/prevgame.command'
import { StartCommand } from '../commands/start.command'
import { IConfigService } from '../config/config.interface'
import { IBotContext } from '../context/context.interface'
import { IGames } from '../parser/interface/game.interface'
import { Command } from './command.class'
import express from 'express'

class Bot {
  private bot: Telegraf<IBotContext>
  private commands: Command[] = []
  private games: IGames
  private app = express()

  constructor(private readonly configService: IConfigService, private readonly game_list: IGames) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.bot.use(session())
    this.games = this.game_list
  }

  async start() {
    this.commands = [new StartCommand(this.bot, this.games), new NextGameCommand(this.bot, this.games), new PrevGameCommand(this.bot, this.games), new BuyCommand(this.bot, this.games, this.configService)]
    for (const command of this.commands) {
      command.handle()
    }
    this.app.use(await this.bot.createWebhook({domain: 'shop-telegram-bot-iota.vercel.app'}))
    this.bot.launch(/*{webhook: { domain: 'shop-telegram-bot-iota.vercel.app', port: 5500 }}*/)
    this.app.listen(5500, () => console.log("Listening on port", 5500))
  }
}

export { Bot }

