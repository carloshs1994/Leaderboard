const postScore = async (newScore) => {
  const sendInfo = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nUT3TlYnotX0jWAN8AyD/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: newScore.user,
      score: newScore.score,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await sendInfo.json();
  return json;
};

const getScore = async () => {
  const getInfo = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nUT3TlYnotX0jWAN8AyD/scores/');
  const json = await getInfo.json();
  return json;
};

export default class Scores {
  constructor() {
    this.scoreList = [];
  }

  addNewScore(newScore, updateDomAndLocalStorage) {
    postScore(newScore).then(() => {
      this.scoreList.push(newScore);
      updateDomAndLocalStorage(this);
      return this.scoreList;
    });
  }

  removeScoresFromList(updateDomAndLocalStorage) {
    this.scoreList.length = 0;
    getScore().then((json) => {
      this.scoreList = json.result;
      updateDomAndLocalStorage(this);
      return this.scoreList;
    });
  }
}