const express = require('express');
const { getData, getDataById } = require('./utils/fsUtils');
const tokenGenerator = require('./utils/tokenGenerator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await getData();
  if (!talker) return res.status(404).send({ message: 'error' });
  return res.status(200).json(talker);
});

app.get('/talker/:id', async ({ params }, res) => {
  const talker = await getDataById(params.id);
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/login', async (_req, res) => {
  const token = tokenGenerator();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});