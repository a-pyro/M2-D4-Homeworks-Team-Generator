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
// let userList = [],
// groups = [];

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
  if (userList.length === 0) {
    console.log('utenti finiti');
    return;
  }
  // ad ogni click shuffle l'array
  let i = 0;
  while (userList.length !== 0) {
    const randomMember = userList[Math.floor(Math.random() * userList.length)];
    const groupInTheMatrix = groups[i % groups.length];
    groupInTheMatrix.push(randomMember);

    userList.splice(userList.indexOf(randomMember), 1);
    i++;
  }

  // for (let i = 0; i < userList.length; i++) {
  //   const randomMember = userList[Math.floor(Math.random() * userList.length)];
  //   const groupInTheMatrix = groups[i % groups.length];
  //   groupInTheMatrix.push(randomMember);
  // }
  // const randomMember = userList[Math.floor(Math.random() * userList.length)];

  // userList.sort((a, b) => 0.5 - Math.random());

  // cerca il gruppo con meno membri nella matrice
  // const lessPopulatedGroup = groups.reduce((acc, cv) => {});

  //cerco il gruppo meno popolato

  // groups.sort((a, b) => {
  //   if (a.length <= b.length) return -1;
  // });

  // groups[0].push(userList[0]);

  // lessPopulatedGroup.push(userList[0]);
  console.table(groups);

  if (userList.length === 0) {
    //render
    console.log('time to render');
  }

  //assign prende dalla memoria un untente a caso e lo mette nella lista che ha meno utenti
  //per ogni gruppo nei gruppi genera una lista e riempila
  for (let i = 0; i < groups.length; i++) {
    const firstGroup = groups[i];
    if (teamsSection.children.length === 0) {
      groups.forEach((_, idx) => {
        const colUL = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
          <h4 class="group-number">Group ${idx + 1}</h4>
          <ul class="list-group" id="list-${idx + 1}">
          </ul>
      </div>
    `;
        teamsSection.innerHTML += colUL;
      });
    }

    const listDom = document.querySelector(`#list-${i + 1}`);
    listDom.innerHTML = '';
    firstGroup.forEach((member, idx) => {
      const listItem = `
      <li class='list-group-item'>${member}</li>
      `;
      listDom.insertAdjacentHTML('beforeend', listItem);
    });
    console.log(shit);
  }
});
