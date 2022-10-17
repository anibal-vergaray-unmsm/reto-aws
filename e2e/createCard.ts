import axios from "axios"

const url = process.env.URL
export const testData ={
    "card_number": 4485275742308327,
    "cvv": 123,
    "expiration_month": "01",
    "expiration_year": "2022",
    "email": "anibal_dj@yahoo.es"
};

const errorTestData ={
    "card_number": 4485275742308327,
    "cvv": 12344,
    "expiration_month": "13",
    "expiration_year": "2050",
    "email": "anibal_dj@outlook.es"
};

export const createCard = () => {
    test("should reply success", async () => {
        const res = await axios.post(
            `${url}/tokens`,
            testData,
            {
                headers:{
                    Authorization: "Bearer GVRDtVQi3ze9rWdmghuGtImnHQyg2AZY",
                }
            })
        
        expect(res.status).toEqual(200)
        expect(res.data.message).toMatch("success")
        expect(res.data.data.card_number).toEqual(testData.card_number);
        expect(res.data.data.cvv).toEqual(testData.cvv);
        expect(res.data.data.expiration_month).toEqual(testData.expiration_month);
        expect(res.data.data.email).toEqual(testData.email);
    
      });

    test("should reply error", async () => {
        let isFail = false;
        try{
            const res = await axios.post(
                `${url}/tokens`,
                errorTestData,
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