import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello World!');
});

router.post('/register', (req, res) => {
  const { email, username, password } = req.body;
  res.send(`Registering user with email ${email} and username ${username} and password ${password}`);
});

router.post('/login', (req, res) => {
  const { credential, password } = req.body;
  res.send(`Logging in as ${credential} with password ${password}`);
});

export default router;