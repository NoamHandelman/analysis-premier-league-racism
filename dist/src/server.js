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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const articles_1 = require("./utils/articles");
const tweets_1 = require("./utils/tweets");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetsCsvPath = path_1.default.join(__dirname, '../tweets.csv');
        const articlesCsvPath = path_1.default.join(__dirname, '../articles.csv');
        const tweets = yield (0, tweets_1.getTweets)(tweetsCsvPath);
        const articles = yield (0, articles_1.getArticles)();
        const response = yield openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            messages: [
                {
                    role: 'system',
                    content: 'Please analyze the data provided on racism in the English Premier League. The data includes various articles and their content about racist incidents in the Premier League, and tweets from the social network Twitter. The analysis should include a brief introduction, key findings in bullet point format, and a brief conclusion. Please provide an analysis that answers the following questions: Who is the team whose players experience the most racism? Who is the group whose fans are involved the most in cases of racism? Is there an actor who experiences racism more than others, and if so who is it? How many of the tweets can be said to be racist in nature? Do incidents of racism come after certain events such as winning or losing a game? Additionally, analyze the trends you find in contexts of profanity, and the general sentiment in contexts of racism. Be based solely on the information provided to you here.',
                },
                {
                    role: 'user',
                    content: `All articles: ${articles} ----- All tweets: ${tweets}`,
                },
            ],
        });
        const responseMessage = response.choices[0].message.content;
        res.status(200).send(responseMessage);
    }
    catch (err) {
        console.error('Error:', err);
        res.sendStatus(500);
    }
}));
app.get('/api/v1/healthCheck', (req, res) => {
    res.sendStatus(200);
});
app.listen('3000', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Server is running at port 3000');
    }
    catch (error) {
        console.error('Error occurred : ', error);
        process.exit(1);
    }
}));
