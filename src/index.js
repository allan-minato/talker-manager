const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');
const { getData, getDataById } = require('./utils/fsUtils');
const tokenGenerator = require('./utils/tokenGenerator');
const { passwordValidator, emailValidator } = require('./utils/loginValidator');
const { tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValitador,
  rateValidator } = require('./utils/addTalker');
const { editTalker } = require('./utils/editTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const path = join(__dirname, '/talker.json');
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await getData();
  if (!talker) return res.status(404).send({ message: 'error' });
  return res.status(200).json(talker);
});

app.get('/talker/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  const response = await fs.readFile(path, 'utf-8');
  const json = await (JSON.parse(response));

  const filter = json.filter((talker) => talker.name.includes(q));
  console.log(filter);
  return res.status(200).json(filter);
});

app.get('/talker/:id', async ({ params }, res) => {
  const talker = await getDataById(params.id);
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/login', passwordValidator, emailValidator, async (_req, res) => {
  const token = tokenGenerator();
  return res.status(200).json({ token });
});

app.post('/talker', tokenValidator,
nameValidator,
ageValidator,
talkValidator,
watchedAtValitador,
rateValidator, async (req, res) => {
  const newTalker = await fs.readFile(path, 'utf-8');
  const newResponseTalkers = await JSON.parse(newTalker);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const id = newResponseTalkers[newResponseTalkers.length - 1].id + 1;

  const newPerson = { id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  newResponseTalkers.push(newPerson);
  await fs.writeFile(path, JSON.stringify(newResponseTalkers));
  return res.status(201).json(newPerson);
});

app.put('/talker/:id', tokenValidator,
nameValidator,
ageValidator,
talkValidator,
watchedAtValitador,
rateValidator, editTalker, async (_req, _res) => {
});

app.delete('/talker/:id', tokenValidator, async (req, res) => {
  const { params: { id } } = req;
  const response = await fs.readFile(path, 'utf-8');
  const json = await (JSON.parse(response));

  const find = json.findIndex((talker) => talker.id === Number(id));

  json.splice(find, 1);
  await fs.writeFile(path, JSON.stringify(json));
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});