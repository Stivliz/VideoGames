const infoApi = require('./apiGames');
const infoDb = require('./bdGames');


const getAllGames = async () => {

    const api = await infoApi();
    const db = await infoDb();

    const resultInfo = [...api, ...db];
    return resultInfo;
}

module.exports = getAllGames;