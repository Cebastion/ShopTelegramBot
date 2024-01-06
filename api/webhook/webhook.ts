import { Telegraf } from 'telegraf';

const bot = new Telegraf('6858541342:AAEcuBp5QqmnvNUCVtKkfH0h2a_kF5jQqh4');

export default async (req: any, res: any) => {
  try {
    if (req.headers['content-type'] === 'application/json') {
      await bot.handleUpdate(req.body);
      res.status(200).end();
    } else {
      res.status(400).send('Bad Request');
    }
  } catch (error) {
    console.error('Error handling update:', error);
    res.status(500).end();
  }
}