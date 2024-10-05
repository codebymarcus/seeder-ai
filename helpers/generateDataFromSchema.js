import axios from 'axios';

const generateDataFromSchema = async (schema, count) => {
  const prompt = `Generate a total of ${count} random records from the following schema, don't repeat the data: ${JSON.stringify(schema, null, 2)}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{
        role: 'user',
        content: prompt
      }],
      max_tokens: 1000,
      temperature: 0.7,
      model: "gpt-3.5-turbo",
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Get the message content from the response
    const generatedData = response.data.choices[0].message.content.trim();

    // Extract valid JSON using a regex
    const matches = generatedData.match(/\{[^}]*\}/g);
    
    const jsonArray = matches.map(match => {
      try {
        return JSON.parse(match);
      } catch (error) {
        throw error;
      }
    });

    return jsonArray;

  } catch (error) {
    throw error;
  }
}

export default generateDataFromSchema;