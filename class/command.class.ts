import { Telegraf } from 'telegraf'

export abstract class Command {
  constructor(public bot: Telegraf<any>){}
  
  abstract handle(): void
} 