import { Router } from 'express';
import accountsRoutes from './accounts';

const router: Router = Router();

router.use('/accounts', accountsRoutes);

export default router;
