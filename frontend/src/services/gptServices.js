import axios from 'axios';

const OPENAI_API_KEY = process.env.VUE_APP_OPENAI_API_KEY;
const SERPER_API_KEY = process.env.VUE_APP_SERPER_API_KEY;

export async function gptServices(prompt){
    try{
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const answer = response.data.choices[0]?.message?.content || "";
        return answer;
    }catch(err){
        console.error('Error in fetching or generating response:', err);
    }
}

export async function fetchSearchResults(query) {
    try {
        const response = await axios.get('https://serpapi.com/search', {
            params: { q: query },
            headers: { 'Authorization': `Bearer ${SERPER_API_KEY}` }
        });
        return response.data.organic_results;
    } catch (err) {
        console.error('Error fetching search results:', err);
    }
}
