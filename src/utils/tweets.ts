import { parseCsv } from './parse-csv';

export const getParsedTweets = async (tweetsCsvPath: string) => {
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
