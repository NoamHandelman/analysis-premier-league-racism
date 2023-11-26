# analysis-premier-league-racism

## Overview
This project aims to automatically analyze incidents of racism in the English Premier League. Utilizing advanced data collection analysis techniques and natural language processing, the project aggregates and examines tweets and articles quantify racist incidents related to the league.

## EndPoints

### 1. api/analysis/quantitative - presentation of quantitative data analysis which was performed by extracting the data from csv files and analyzing them using the Danfo.js library.

### 2. api/analysis/nlp - Retrieving articles from Google using a scraping technique with the Playwright library, retrieving tweets from a csv file and analyzing all of these using the chatGPT API.

## Production

The production version can be accessed at the following addresses -

https://premier-league-racism.onrender.com/api/analysis/quantitative

https://premier-league-racism.onrender.com/api/analysis/nlp

## Installation

### Option 1: Manual Setup
To set up this project manually, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/NoamHandelman/analysis-premier-league-racism.git
   cd analysis-premier-league-racism

   ```bash
   npm install

   ```bash
   npm run build

   ```bash
   npm start
   
### Option2: Use Docker
```bash
git clone https://github.com/NoamHandelman/analysis-premier-league-racism.git
   cd analysis-premier-league-racism

```bash
docker build -t pl-racism-analysis.

docker run -p 3000:3000 analysis-premier-league-racism

Or, run the image directly from Docker Hub (if available):

```bash
docker run -p 3000:3000 noamhandelman/pl-racism-analysis:latest




   
