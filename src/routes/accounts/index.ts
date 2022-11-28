import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';

import { queryValidateMiddleware } from '../../validations/account';
import { Country, IAccountQueryParams } from '../interfaces/account';
import { generateFakeData } from '../utils/faker';

const router: Router = Router();

router.get(
  '/',
  queryValidateMiddleware,
  (req: Request<{}, {}, {}, IAccountQueryParams>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const country = Country[req.query.country];
    const page = parseInt(req.query.page);
    const errorsCount = parseFloat(req.query.errorsCount);
    const seed = parseInt(req.query.seed);
    const accounts = generateFakeData({ page, country, errorsCount, seed });

    res.status(200).json(accounts);
  }
);

export default router;
