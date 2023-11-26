import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { getParsedTweets } from '../utils/tweets';
import {
  analyzeArticlesDataset,
  getFormattedArticlesAnalyze,
  getParsedArticles,
} from '../utils/articles';
import OpenAI from 'openai';
import { columnsToAnalyze, chatGptPrompt } from '../lib/constants';

export const nlpAnalysisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const tweetsCsvPath = path.join(__dirname, '../../tweets.csv');

    const tweets = await getParsedTweets(tweetsCsvPath);

    const articles = await getParsedArticles();

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

    const analysis = response.choices[0].message.content;

    res.status(200).send(analysis);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const quantitativeAnalysisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetsCsvPath = path.join(__dirname, '../../tweets.csv');

    const analyzedArticles = await getFormattedArticlesAnalyze();

    res.status(200).send(`<p>${analyzedArticles}</p>`);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};
