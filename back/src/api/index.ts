import express from 'express';

import clients from './clients';
import staff from './staff';

const router = express.Router();

router.use('/clients', clients);
router.use('/staff', staff);

export default router;
