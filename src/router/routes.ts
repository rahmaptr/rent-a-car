import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello World!');
});

router.post('/register');

router.post('/login');

export default router;