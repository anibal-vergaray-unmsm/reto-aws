import mongoose from 'mongoose';
import { customAlphabet, nanoid } from 'nanoid'

const customToken = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)

export type CardsDocument = mongoose.Document & {
  _id: string,
  token: string,
  card_number: number,
  cvv: number,
  expiration_month: string,
  expiration_year: string,
  email: string,
  created_at: Date,
};

const cardsSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  token: { type: String, default: () => customToken() },
  card_number: Number,
  cvv: Number,
  expiration_month: String,
  expiration_year: String,
  email: String,
  createdAt: { type: Date, expires: '15m', default: Date.now }
});

export const cards = (mongoose.models.cards ||
mongoose.model<CardsDocument>('cards', cardsSchema, process.env.DB_CARDS_COLLECTION)
);