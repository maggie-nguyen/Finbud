import dotenv from 'dotenv';
dotenv.config();

const ALPHAVANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Fetches stock data from Alpha Vantage and then uses it to generate a contextual response from a GPT API.
 * @param {string} stockSymbol - The stock symbol to fetch data for and discuss.
 * @returns {Promise<string>} - A promise that resolves with the AI-generated text about the stock.
 */
export async function gptAPICall(stockSymbol) {
    try {
        const stockUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
        const stockResponse = await fetch(stockUrl);
        const stockData = await stockResponse.json();
  
        const price = stockData['Global Quote']['05. price'];
        const prompt = `Generate a detailed analysis of ${stockSymbol} which currently trades at $${price}.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });

        const responseData = await response.json();
        return responseData.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error in fetching or generating response:', error);
        throw error;
    }
}

/**
 * Defines a term using openai.
 * @param {string} str - The term to define.
 * @returns {Promise<string>} - A promise that resolves with the AI-generated text about the term.
 */
export async function gptAPICallDefine(str) {
    try {
        const prompt = `Explain ${str} to me as if I'm 15.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });

        const responseData = await response.json();
        return responseData.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error in fetching or generating response:', error);
        throw error;
    }
}
