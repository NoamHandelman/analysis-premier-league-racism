"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = exports.scrapeRacismArticles = void 0;
const playwright_1 = require("playwright");
const scrapeRacismArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield playwright_1.chromium.launch();
        const context = yield browser.newContext();
        const page = yield context.newPage();
        const baseUrl = 'https://www.google.com/search?q=premier+league+racism&sca_esv=584679428&tbm=nws&sxsrf=AM9HkKlcFUSqC1G92OumLT-IilZjINNWbg:1700687247970&source=lnt&tbs=sbd:1&sa=X&ved=2ahUKEwjS5qfawdiCAxWbR_EDHafMC14QpwV6BAgBEC8&biw=1470&bih=713&dpr=';
        let articlesArray = [];
        let articleNumber = 0;
        for (let i = 0; i < 8; i++) {
            yield page.goto(`${baseUrl}${i + 1}`);
            const currentPageArticles = yield page.$$eval('.GI74Re.nDgy9d span[dir="ltr"]', (spans, articleNumber) => spans.map((span, index) => {
                if (!span.textContent)
                    throw new Error('Span is null');
                return {
                    articleId: articleNumber + index + 1,
                    content: span.textContent.trim(),
                };
            }), articleNumber);
            articlesArray = [...articlesArray, ...currentPageArticles];
            articleNumber += currentPageArticles.length;
        }
        yield browser.close();
        return articlesArray;
    }
    catch (error) {
        throw new Error('Failed to scrape articles : ' + error);
    }
});
exports.scrapeRacismArticles = scrapeRacismArticles;
const getArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    const articlesArray = yield (0, exports.scrapeRacismArticles)();
    const articlesString = articlesArray
        .map((article) => `article ${article.articleId}: ${article.content}`)
        .join('\n');
    return articlesString;
});
exports.getArticles = getArticles;
