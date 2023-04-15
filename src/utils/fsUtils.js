const fs = require('fs/promises');
const { join } = require('path');

const talkerJSON = '../talker.json';

async function getData() {
    try {
        const data = await fs.readFile(join(__dirname, talkerJSON));
        const response = await JSON.parse(data);
        if (!response) throw new Error('Arquivo não encontrado');
        return response;
    } catch (error) {
     console.error(error.message);
     return null;
    }
}

async function getDataById(paramID) {
    const talkers = await getData();
    const filtered = talkers.find(({ id }) => id === Number(paramID));
    return filtered;
  }

module.exports = {
    getData,
    getDataById,
};