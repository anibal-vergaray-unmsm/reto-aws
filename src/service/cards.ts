import { Model } from 'mongoose';
import { CardsDocument } from '../model';
import { CreateCardSchema } from '../schemas/cards';

export class CardsService {
  private cards: Model<CardsDocument>;
  constructor(cards: Model<CardsDocument>) {
    this.cards = cards;
  }

  async createCard (params: CreateCardSchema): Promise<object> {
    try {
      const result = await this.cards.create({
        card_number: params.card_number,
        cvv: params.cvv,
        expiration_month: params.expiration_month,
        expiration_year: params.expiration_year,
        email: params.email,
      });

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  findOneCardByToken (token: string) {
    return this.cards.findOne({token});
  }
}
