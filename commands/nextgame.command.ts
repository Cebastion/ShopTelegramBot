import { Telegraf } from 'telegraf'
import { Command } from '../class/command.class'

export class NextGameCommand extends Command {
  constructor(bot: Telegraf<any>) {
    super(bot)
  }

  handle(): void {
    
  }
}