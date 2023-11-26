import { chromium } from 'playwright';
import * as dfd from 'danfojs-node';
import path from 'path';
import { columnsSentences, columnsToAnalyze } from '../lib/constants';

export const scrapeRacismArticles = async () => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseUrl =
      'https://www.google.com/search?q=premier+league+racism&sca_esv=584679428&tbm=nws&sxsrf=AM9HkKlcFUSqC1G92OumLT-IilZjINNWbg:1700687247970&source=lnt&tbs=sbd:1&sa=X&ved=2ahUKEwjS5qfawdiCAxWbR_EDHafMC14QpwV6BAgBEC8&biw=1470&bih=713&dpr=';

    let articlesArray: Article[] = [];
    let articleNumber = 0;

    for (let i = 0; i < 8; i++) {
      await page.goto(`${baseUrl}${i + 1}`);

      const currentPageArticles: Article[] = await page.$$eval(
        '.GI74Re.nDgy9d span[dir="ltr"]',
        (spans, articleNumber) =>
          spans.map((span, index) => {
            if (!span.textContent) throw new Error('Span is null');
            return {
              articleId: articleNumber + index + 1,
              content: span.textContent.trim(),
            };
          }),
        articleNumber
      );

      articlesArray = [...articlesArray, ...currentPageArticles];
      articleNumber += currentPageArticles.length;
    }

    await browser.close();
    return articlesArray;
  } catch (error) {
    throw new Error('Failed to scrape articles : ' + error);
  }
};

export const getParsedArticles = async () => {
  const articles = await scrapeRacismArticles();
  const articlesString = articles
    .map((article) => `article ${article.articleId}: ${article.content}`)
    .join('\n');
  return articlesString;
};

export const analyzeArticlesDataset = async (column: string) => {
  const articlesCsvPath = path.join(__dirname, '../../articles.csv');

  const df = await dfd.readCSV(articlesCsvPath);

  let groupByColumn = df.groupby([column]).size();

  groupByColumn.dropNa({ axis: 1, inplace: true });

  groupByColumn.sortValues('applyOps', {
    ascending: false,
    inplace: true,
  });

  groupByColumn.rename({ [`${column}_Group`]: column }, { inplace: true });

  const groupByColumnJsonObj = dfd.toJSON(groupByColumn, {
    format: 'column',
  }) as Record<string, string | number>[];

  let resultString = `${columnsSentences[column]}\n`;

  groupByColumnJsonObj.forEach((obj) => {
    const key = Object.keys(obj).find((key) => key !== 'applyOps');
    if (key) {
      const item = obj[key] as string;
      const count = obj['applyOps'] as number;
      resultString += `${item} - ${count}\n`;
    }
  });

  return resultString;
};

export const getFormattedArticlesAnalyze = async () => {
  let combinedResults = '';

  for (const column of columnsToAnalyze) {
    const analysisResult = await analyzeArticlesDataset(column);
    combinedResults += analysisResult + '\n';
  }

  return combinedResults;
};
