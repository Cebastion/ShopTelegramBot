import { Telegraf } from 'telegraf'
import { IBotContext } from '../context/context.interface'
import { IGames } from '../parser/interface/game.interface'

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>, public games: IGames) { }

  abstract handle(): void
} 