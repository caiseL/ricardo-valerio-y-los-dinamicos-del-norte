import express from 'express';

import clients from './clients';
import staff from './staff';
import eventOptions from './event-options';

const router = express.Router();

router.use('/clients', clients);
router.use('/staff', staff);
router.use('/event-options', eventOptions);

export default router;
