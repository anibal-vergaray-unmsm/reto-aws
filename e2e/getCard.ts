import axios from "axios"
import { testData } from "./createCard";

const url = process.env.URL

const errorTestToken = '12345678910'

export const getCard = () => {
    test("should reply success", async () => {
        const createCardResponse = await axios.post(
            `${url}/tokens`,
            testData,
            {
                headers:{
                    Authorization: "Bearer GVRDtVQi3ze9rWdmghuGtImnHQyg2AZY",
                }
            })
        const token = createCardResponse?.data?.data?.token;
        const getCardResponse = await axios.get(
            `${url}/tokens/${token}`,
            {
                headers:{
                    Authorization: "Bearer GVRDtVQi3ze9rWdmghuGtImnHQyg2AZY",
                }
            })
        
        expect(getCardResponse.status).toEqual(200)
        expect(getCardResponse.data.message).toMatch("success")
        expect(getCardResponse.data.data.card_number).toEqual(testData.card_number);
        expect(getCardResponse.data.data.expiration_month).toEqual(testData.expiration_month);
        expect(getCardResponse.data.data.email).toEqual(testData.email);
    
      });

    test("should reply error", async () => {
        let isFail = false;
        try{
            const res = await axios.get(
                `${url}/tokens/${errorTestToken}`,
                {
                    headers:{
                        Authorization: "Bearer GVRDtVQi3ze9rWdmghuGtImnHQyg2AZY",
                    }
                })
        }catch(e){
            isFail= true;
            expect(e).toEqual(new Error("Request failed with status code 400"))
        }

        expect(isFail).toEqual(true);

      });
}