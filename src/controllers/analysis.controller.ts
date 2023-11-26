import { NextFunction, Request, Response } from 'express';
import { getFormattedTweetsAnalyze, getParsedTweets } from '../utils/tweets';
import {
  getFormattedArticlesAnalyze,
  getParsedArticles,
} from '../utils/articles';
import { getNlpAnalysis } from '../utils/nlp';

export const nlpAnalysisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await getParsedTweets();

    const articles = await getParsedArticles();

    const analysis = await getNlpAnalysis(articles, tweets);

    res.status(200).send(analysis);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const quantitativeAnalysisController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const analyzedArticlesData = await getFormattedArticlesAnalyze();

    const analyzedTweetsData = await getFormattedTweetsAnalyze();

    res
      .status(200)
      .send(
        `Incidents analyze : ${analyzedArticlesData} ------------------- Tweets Analyzed : ${analyzedTweetsData}`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
