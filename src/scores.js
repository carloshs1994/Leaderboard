export default class Scores {
  constructor() {
    this.scoreList = [];
  }

  addNewScore(newScore) {
    return this.scoreList.push(newScore);
  }

  removeScoresFromList() {
    this.scoreList.length = 0;
    return this.scoreList;
  }
}