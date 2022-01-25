import './style.css';
import Scores from './scores';
import Score from './individualScore';

const list = document.querySelector('ul');
const form = document.querySelector('form');
const name = document.querySelector('#name');
const points = document.querySelector('#points');
const modalContainer = document.querySelector('.modal-container');

const scores = new Scores();

function checkIfEmpty() {
  if (scores.scoreList.length !== 0) {
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
}

function addToLocalStorage(scores) {
  localStorage.setItem('scores', JSON.stringify(scores));
}

function appendScoresToList() {
  list.innerHTML = '';
  scores.scoreList.forEach((score, index) => {
    const li = document.createElement('li');

    if (index % 2 === 1) {
      li.classList = 'bg-white';
    }

    li.innerHTML = `
    <p>"<span>${score.name}</span>" </p>
    <p>: ${score.points}</p>
    `;
    list.appendChild(li);
  });
}

function updateDomAndLocalStorage() {
  appendScoresToList();
  localStorage.clear();
  addToLocalStorage(scores);
  checkIfEmpty();
}

function removeScore() {
  const removeButton = document.querySelector('.refresh');
    removeButton.addEventListener('click', () => {
      scores.removeScoresFromList();
      updateDomAndLocalStorage();
      removeScore();
    });
  
}

function getFromLocalStorage() {
  if (localStorage.length !== 0) {
    const scoresFromLocStg = JSON.parse(localStorage.getItem('scores'));
    scoresFromLocStg.scoreList.forEach((score) => {
      scores.scoreList.push(score);
    });
    updateDomAndLocalStorage();
    removeScore();
  }
}

getFromLocalStorage();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newScore = new Score(name.value, points.value);
  name.value = '';
  points.value = '';
  scores.addNewScore(newScore);
  updateDomAndLocalStorage();
  modalContainer.style.display = 'flex';
  setTimeout(() => {
    modalContainer.style.display = 'none';
  }, 2000);
  removeScore();
});

setInterval(() => {
  const today = new Date();
  let month = '';
  let day = '';
  let hour = today.getHours();
  let hourType = 'am';

  if (hour > 12) {
    hour -= 12;
    hourType = 'pm';
  } else if (hour === 12) {
    hourType = 'pm';
  }

  switch (today.getDate()) {
    case 1:
      day = 'st';
      break;
    case 2:
      day = 'nd';
      break;
    case 3:
      day = 'rd';
      break;
    default:
      day = 'th';
  }

  switch (today.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
    default:
      month = 'Do not know';
  }

  const date = `${month} ${today.getDate()}${day} ${today.getFullYear()},`;
  const time = `${hour}:${today.getMinutes()}:${today.getSeconds()} ${hourType}`;
  const dateTime = `${date} ${time}`;
  document.querySelector('.time-and-date').innerHTML = dateTime;
}, 1000);