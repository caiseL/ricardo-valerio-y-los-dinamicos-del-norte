import express from 'express';

import auth from './auth';
import clients from './clients';
import staff from './staff';
import eventOptions from './event-options';

const router = express.Router();

router.use('/auth', auth);
router.use('/clients', clients);
router.use('/staff', staff);
router.use('/event-options', eventOptions);

export default router;
