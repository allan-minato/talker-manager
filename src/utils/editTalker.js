const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';
const joinPath = join(__dirname, path);
  
  const editTalker = async (req, res) => {
  const talkerJSON = await fs.readFile(joinPath, 'utf-8');
  const responseTalkers = await JSON.parse(talkerJSON);
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const hasId = responseTalkers.some((talker) => talker.id === Number(id));
  if (!hasId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const talkerIndex = responseTalkers.findIndex((talker) => talker.id === Number(id));
  const editedTalker = { id: Number(id), name, age, talk: { watchedAt, rate } };
  responseTalkers[talkerIndex] = editedTalker;
  await fs.writeFile(joinPath, JSON.stringify(responseTalkers));
  return res.status(200).json(editedTalker);
};
module.exports = {
    editTalker,
};