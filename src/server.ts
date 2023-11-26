import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import analysisRoute from './routes/analysis.route';

dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use('/api/analysis', analysisRoute);

app.get('/api/healthCheck', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.listen('3000', async () => {
  try {
    console.log('Server is running at port 3000');
  } catch (error: any) {
    console.error('Error occurred : ', error);
    process.exit(1);
  }
});
