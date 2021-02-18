console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

// memoria
let userList = [
    'mario',
    'ardi',
    'gianni',
    'semprinoio',
    'giorgio',
    'la fiera della salsiccia',
    'mettiamo anche una donna',
  ],
  groups = [[], [], [], []];

// referenze dom
const textArea = document.getElementById('textArea');
const selectNumGroups = document.getElementById('selectNumGroups');
const addBtn = document.getElementById('addBtn');
const formCol = document.getElementById('formCol');
const showcaseList = document.getElementById('showcaseList');

const assignBtn = document.getElementById('assignBtn');
const resetBtn = document.getElementById('resetBtn');

const teamsSection = document.getElementById('teamsSection');

//listener
addBtn.addEventListener('click', (e) => {
  //prendo input
  e.preventDefault();

  const userListDom = textArea.value;
  if (userListDom === '') {
    console.log('please insert names');
    return;
  } // % implementare altro

  //pulisco la stringa
  const cleanedList = userListDom.split(',').map((name) => name.trim());

  //metto in memori
  userList = [...cleanedList];

  // prendo numero gruppi
  const groupsNum = selectNumGroups.value;

  //creo matrice
  for (let i = 0; i < groupsNum; i++) {
    groups.push([]);
  }

  //! controllare per non riempire la matrice a caso
  //mostro la colonna della lista
  formCol.classList.add('col-sm-6');
  showcaseList.classList.remove('d-none');

  //render in showcase
  userList.forEach((user) => {
    const listItem = `<li class='list-group-item'>${user}</li>`;
    // console.log(showcaseList.firstElementChild);
    showcaseList.firstElementChild.insertAdjacentHTML('beforeend', listItem);
  });

  //! qui per ora ok, da vedere i casi in cui tenta di aggiugere altra roba mentre abbiamo già una lista in corso
});

assignBtn.addEventListener('click', () => {
  console.log(shit);

  // ad ogni click shuffle l'array
  userList.sort((a, b) => 0.5 - Math.random());

  // cerca il gruppo con meno membri nella matrice
  // const lessPopulatedGroup = groups.reduce((acc, cv) => {});

  //cerco il gruppo meno popolato

  groups.sort((a, b) => {
    if (a.length <= b.length) return -1;
  });

  // lessPopulatedGroup.push(userList[0]);
  console.table(groups);
  // console.log(userList, groups);

  //assign prende dalla memoria un untente a caso e lo mette nella lista che ha meno utenti
});
