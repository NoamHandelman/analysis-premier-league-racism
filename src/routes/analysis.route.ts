import express from 'express';

import {
  nlpAnalysisController,
  quantitativeAnalysisController,
} from '../controllers/analysis.controller';

const router = express.Router();

router.route('/nlp').get(nlpAnalysisController);

router.route('/quantitative').get(quantitativeAnalysisController);

export default router;
