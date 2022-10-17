import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { CardsService } from '../service/cards';
import { createCardSchema, tokenSchema } from '../schemas/cards';
import { CardsDocument } from '../model';

export class CardsController extends CardsService {
  constructor (cards: Model<CardsDocument>) {
    super(cards);
  }

  async create (event) {
    const params = JSON.parse(event.body);
    const {Authorization : pk} = event.headers;
    const parseCard = createCardSchema.safeParse(params);

    if (!pk) {
      return MessageUtil.error("Unauthorized");
    }
  
    if (!parseCard.success) {
      console.log(parseCard.error);
      return MessageUtil.error("Validation error", parseCard.error);
    }

    try {
      const result = await this.createCard({
        card_number: parseCard.data.card_number,
        cvv: parseCard.data.cvv,
        expiration_month: parseCard.data.expiration_month,
        expiration_year: parseCard.data.expiration_year,
        email: parseCard.data.email,
      });

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.message);
    }
  }

  async findOne (event) {
    const token = event.pathParameters.token;
    const {Authorization : pk} = event.headers;
    const parseToken = tokenSchema.safeParse(token);

    if (!pk) {
      return MessageUtil.error("Unauthorized");
    }

    if (!parseToken.success) {
      console.log(parseToken.error);
      return MessageUtil.error("Validation error", parseToken.error);
    }

    try {
      const result = await this.findOneCardByToken(parseToken.data);

      if(!result){
        return MessageUtil.error("The item has expired");
      }

      return MessageUtil.success(
        {
          card_number: result.card_number,
          expiration_month: result.expiration_month,
          expiration_year: result.expiration_year,
          email: result.email,
        }
      );

    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.message);
    }
  }
}
