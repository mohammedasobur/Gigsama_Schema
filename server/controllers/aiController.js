const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateSchema = async (req, res) => {
  try {
    const { message, conversation, completed } = req.body;

    const formattedConversation = conversation.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    if (completed) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // Changed from "gpt-4" to "gpt-3.5-turbo"
        messages: [
          {
            role: "system",
            content: "You are a database schema design assistant. Based on the conversation, create a MongoDB schema that meets the user's requirements. Return ONLY a JSON object with the schema design."
          },
          ...formattedConversation
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      try {
        const schemaText = response.choices[0].message.content;
        const schema = JSON.parse(schemaText);

        return res.json({
          completed: true,
          schema
        });
      } catch (err) {
        console.error('Error parsing schema JSON:', err);
        return res.status(500).json({ message: 'Failed to parse schema' });
      }
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Changed from "gpt-4" to "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a database schema design assistant. Ask the user targeted questions to understand their database needs."
        },
        ...formattedConversation,
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiMessage = response.choices[0].message.content;
    const hasEnoughInfo = aiMessage.includes("I have enough information to generate your schema now");

    return res.json({
      completed: hasEnoughInfo,
      message: aiMessage
    });
  } catch (err) {
    console.error('Error generating schema:', err);
    res.status(500).json({ message: 'AI service error' });
  }
};
