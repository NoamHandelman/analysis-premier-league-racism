import { parseCsv } from './parse-csv';
import * as dfd from 'danfojs-node';
import path from 'path';

// Transform tweets from tweets.csv to string

export const getParsedTweets = async () => {
  const tweetsCsvPath = path.join(__dirname, '../../tweets.csv');
  const tweets = await parseCsv<Tweet>(tweetsCsvPath);
  const tweetsString = tweets
    .map(
      (tweet, index) =>
        `tweet ${index + 1}: ${tweet.tweet}. tweet's nature: ${
          tweet.nature
        }. against: ${tweet.against}`
    )
    .join('\n');
  return tweetsString;
};

// // Analyzed tweets.csv ,transform quantitative analyze to string and return it

export const getFormattedTweetsAnalyze = async () => {
  const tweetsCsvPath = path.join(__dirname, '../../tweets.csv');

  const df = await dfd.readCSV(tweetsCsvPath);

  // Segmentation by percentage of nature  tweets

  const tweetsNumber = df['nature'].size;
  let groupByNature = df.groupby(['nature']).size();

  const groupByNatureArray = dfd.toJSON(groupByNature, {
    format: 'column',
  }) as NatureCount[];

  const natureString = groupByNatureArray
    .map(
      (obj) =>
        `${obj.nature_Group} - ${((obj.applyOps / tweetsNumber) * 100).toFixed(
          2
        )} %`
    )
    .join('\n');

  // Segmentation by percentage of critical tweets

  const criticalTweetsObj = groupByNatureArray.find(
    (obj) => obj.nature_Group === 'critical'
  );

  let groupByCriticism = df.groupby(['against']).size();

  groupByCriticism.dropNa({ axis: 1, inplace: true });

  const groupByCriticismArray = dfd.toJSON(groupByCriticism, {
    format: 'column',
  }) as CriticismCount[];

  const criticalTweets = criticalTweetsObj?.applyOps;

  if (!criticalTweets) throw new Error('Unable to calculate criticismTweets');

  const criticismString = groupByCriticismArray
    .map(
      (obj) =>
        `Critical against ${obj.against_Group} - ${(
          (obj.applyOps / criticalTweets) *
          100
        ).toFixed(2)} %`
    )
    .join('\n');

  const analysis = `Segmentation by percentage of nature of tweets : ${natureString}\n Segmentation by percentage of critical tweets : ${criticismString}
    `;

  return analysis;
};
