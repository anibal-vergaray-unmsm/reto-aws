import * as z from 'zod';

const luhnCheck = num => {
    const arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    const lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    return sum % 10 === 0;
  };

export const createCardSchema = z.object({
    card_number: z.number().refine(
        (v) => luhnCheck(v),
        {
            message: 'Tarjeta inválida'
        }),
    cvv: z.number(),
    expiration_month: z.string().refine(
        (v) => {
            const parsedValue = parseInt(v) || 0;
            return parsedValue >= 1 && parsedValue <= 12;
        },{
            message: 'It must be a number from 1 to 12.'
        }),
    expiration_year: z.string().refine(
        (v) => {
            const parsedValue =  parseInt(v) || 0;
            const currentYear = (new Date()).getFullYear();
            const difference = parsedValue - currentYear;
            return difference >= 0 && difference <= 5;
        },{
            message: 'It must not be more than 5 years old, not less than the current year.'
        }),
    email: z.string().email().refine(
        (v) => {
            const domain =  v.split('@')[1];
            const validDomains = ['gmail.com','hotmail.com','yahoo.es']
            return validDomains.includes(domain);
        },{
            message: 'It must belong to the domains: gmail.com, hotmail.com or yahoo.es'
        }),
    }).refine(
        (data) => {
            const cardNumber = data.card_number.toString();
            const firstDigits = cardNumber.slice(0,2);

            if(firstDigits === '34' || firstDigits === '37') return data.cvv.toString().length === 4
            else return data.cvv.toString().length === 3
        }, {
        message: 'It must be 4 digits for American Express and 3 digits for Visa or MasterCard',
        path: ['cvv'],
    });

export type CreateCardSchema = z.infer<typeof createCardSchema>;

export const tokenSchema = z.string().length(16);