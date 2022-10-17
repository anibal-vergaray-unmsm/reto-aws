import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env`);
dotenv.config({
  path: dotenvPath,
});

import { cards } from './model';
import { CardsController } from './controller/cards';
const cardsController = new CardsController(cards);

export const create = async (event: any) => {
  return cardsController.create(event);
};

export const findOne = async (event: any) => {
  return cardsController.findOne(event);
};

