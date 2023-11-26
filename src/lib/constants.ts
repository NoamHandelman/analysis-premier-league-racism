export const chatGptPrompt =
  'Please analyze the data provided on racism in the English Premier League. The data includes various articles and their content about racist incidents in the Premier League, and tweets from the social network Twitter. The analysis should include a brief introduction, key findings in bullet point format, and a brief conclusion. Please provide an analysis that answers the following questions: Who is the team whose players experience the most racism? Who is the group whose fans are involved the most in cases of racism? Is there an actor who experiences racism more than others, and if so who is it? How many of the tweets can be said to be racist in nature? Do incidents of racism come after certain events such as winning or losing a game? Additionally, analyze the trends you find in contexts of profanity, and the general sentiment in contexts of racism. Be based solely on the information provided to you here.';

export const columnsToAnalyze = [
  'factor team',
  'experienced team',
  'event',
  'factor',
  'actions',
  'platform',
];

export const columnsSentences: ColumnsSentencesType = {
  'factor team':
    'The groups that were involved in cases of racism, and the frequency of each group:',
  'experienced team':
    'The team whose players were subjected to the most racism, and the frequency of each team:',
  event:
    'The events that led to cases of racism, and the frequency of each event:',
  factor:
    'The factors that expressed racism, and the frequency of each factor:',
  actions:
    'The actions taken against those expressing racism, and the frequency of each action:',
  platform:
    'The platform/place where incidents of racism occurred, and the frequency of each platform/place:',
};
