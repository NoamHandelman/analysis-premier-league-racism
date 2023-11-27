# Analysis of Racism in the English Premier League

## Overview
This project aims to automatically analyze incidents of racism in the English Premier League. Utilizing advanced data collection and analysis techniques along with natural language processing, the project aggregates and examines tweets and articles to quantify racist incidents related to the league.

## Endpoints
1. **Quantitative Analysis (`/api/analysis/quantitative`)**: Presents quantitative data analysis performed by extracting data from CSV files and analyzing them using the Danfo.js library.
2. **NLP Analysis (`/api/analysis/nlp`)**: Retrieves articles from Google using scraping techniques with the Playwright library and retrieves tweets from a CSV file, analyzing all data using the ChatGPT API.

## Production Access
The production version can be accessed at:
- Quantitative Analysis: [https://premier-league-racism.onrender.com/api/analysis/quantitative](https://premier-league-racism.onrender.com/api/analysis/quantitative)
- NLP Analysis: [https://premier-league-racism.onrender.com/api/analysis/nlp](https://premier-league-racism.onrender.com/api/analysis/nlp)

**Note**: The NLP endpoint currently returns an empty response due to an issue with retrieving articles using Playwright in production. Locally, it functions as expected!

## Installation

### Option 1: Manual Setup
To set up this project manually, follow these steps:

1. Clone the Repository:
   
   git clone https://github.com/NoamHandelman/analysis-premier-league-racism.git
   
   cd analysis-premier-league-racism
   
3. Install Dependencies:

   npm install

3. Build the Project:
   
   npm run build

5. Start the Application:

   npm start

   
### Option 2: Using Docker
Alternatively, you can set up the project using Docker:

Clone the Repository and Navigate to the Directory:

git clone https://github.com/NoamHandelman/analysis-premier-league-racism.git

cd analysis-premier-league-racism


Build the Docker Image:

docker build -t pl-racism-analysis .

Run the Docker Container:

docker run -p 3000:3000 pl-racism-analysis

Or, run the image directly from Docker Hub (if available):

docker run -p 3000:3000 noamhandelman/pl-racism-analysis:latest


## Local Access
After installation, access the application locally at:

1. NLP Analysis: http://localhost:3000/api/analysis/nlp
2. Quantitative Analysis: http://localhost:3000/api/analysis/quantitative
