import { Context } from 'telegraf'

export interface SessionData {
  currentGame: number
}

export interface IBotContext extends Context {
  session: SessionData
}