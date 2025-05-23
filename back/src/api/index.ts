import express from 'express';

import auth from './auth';
import clients from './clients';
import eventOptions from './event-options';
import events from './events';
import staff from './staff';

const router = express.Router();

router.use('/auth', auth);
router.use('/clients', clients);
router.use('/event-options', eventOptions);
router.use('/events', events);
router.use('/staff', staff);

export default router;
