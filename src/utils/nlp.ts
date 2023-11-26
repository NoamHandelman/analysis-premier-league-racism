import OpenAI from 'openai';
import { chatGptPrompt } from '../lib/constants';

// Ask for chat gpt for nlp analysis based on the collected articles and tweets

export const getNlpAnalysis = async (articles: string, tweets: string) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content: chatGptPrompt,
        },

        {
          role: 'user',
          content: `All articles: ${articles} ----- All tweets: ${tweets}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('NLP Analysis failed with this error - ' + error);
  }
};
