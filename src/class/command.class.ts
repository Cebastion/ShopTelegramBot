import { Telegraf } from 'telegraf'
import { IGames } from '../parser/interface/game.interface'
import { IBotContext } from '../context/context.interface'

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>, public games: IGames){}
  
  abstract handle(): void
} 