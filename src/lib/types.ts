type Tweet = {
  tweet: string;
  comment: string;
  nature: string;
  team: string | null;
  against: string | null;
};

type Article = {
  articleId: number;
  content: string;
};

type NatureCount = {
  nature_Group: 'critical' | 'natural' | 'racist';
  applyOps: number;
};

type CriticismCount = {
  against_Group: string;
  applyOps: number;
};

type ColumnsSentencesType = {
  'factor team': string;
  'experienced team': string;
  event: string;
  factor: string;
  actions: string;
  platform: string;
  [key: string]: string;
};
