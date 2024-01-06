import { Bot } from '../../src/class/bot.class'
import { VercelRequest, VercelResponse } from '@vercel/node';
import { ConfigService } from '../../src/config/config.service'

const bot = new Bot(new ConfigService())
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await bot.webhook(req, res);
}