console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

// memoria
/* let userList = [
    'mario',
    'ardi',
    'gianni',
    'semprinoio',
    'giorgio',
    'la fiera della salsiccia',
    'mettiamo anche una donna',
  ],
  groups = [[], [], [], []]; */
let userList = [],
  groups = [],
  i = 0;

// referenze dom
const textArea = document.getElementById('textArea');
const selectNumGroups = document.getElementById('selectNumGroups');
const addBtn = document.getElementById('addBtn');
const firstColForm = document.getElementById('firstColForm');
const showcaseList = document.getElementById('showcaseList');
const formList = showcaseList.firstElementChild;

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

  //controllo che non abbia già aggiunto
  if (userList.length > 0) return;
  //pulisco la stringa
  const cleanedList = userListDom.split(',').map((name) => name.trim());

  //pulisco textarea nel dom
  textArea.value = '';

  //metto in memoria
  userList = [...cleanedList];

  // prendo numero gruppi
  const groupsNum = selectNumGroups.value;

  //creo matrice
  for (let i = 0; i < groupsNum; i++) {
    groups.push([]);
  }

  //! controllare per non riempire la matrice a caso
  //mostro la colonna della lista
  firstColForm.classList.add('col-sm-6');
  showcaseList.classList.remove('d-none', 'animate__fadeOutRight');
  showcaseList.classList.add('animate__animated', 'animate__fadeInRight');
  //render in showcase
  userList.forEach((user) => {
    const listItem = `<li class='list-group-item'>${user}</li>`;
    // console.log(showcaseList.firstElementChild);
    formList.insertAdjacentHTML('beforeend', listItem);
  });

  //! qui per ora ok, da vedere i casi in cui tenta di aggiugere altra roba mentre abbiamo già una lista in corso
});

assignBtn.addEventListener('click', () => {
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
  if (userList.length === 0) {
    console.log('utenti finiti, good job! 😎');
    return;
  }

  //prendo player random
  const randomMember = userList[Math.floor(Math.random() * userList.length)];

  //prendo un gruppo progressivamente
  const progressiveGroupInTheMatrix = groups[i % groups.length]; //ogni volta prende un gruppo diverso
  console.log(progressiveGroupInTheMatrix);
  progressiveGroupInTheMatrix.push(randomMember); //metto il membro nella lista prograssiva

  console.log(groups, i);

  const gruppoNelDom = document.getElementById(
    `list-${(i % groups.length) + 1}`
  ); //prendo sempre una lista diversa (progressiva) nel dom, metto + 1 fuori dal modulo perchè gli id nel dom sono 1,2,3,4...

  //metto il membro nel dom
  const listItem = `<li class='list-group-item'>${randomMember}<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button></li>`;
  gruppoNelDom.innerHTML += listItem;

  //ora devo rimuoverlo dallo showcase
  const usersInShowCase = formList.querySelectorAll('li'); //prendo tutti i list item

  const liToRemove = [...usersInShowCase].find(
    (listItem) => listItem.innerText === randomMember
  ); //questo mi trova il list item da rimuovere dallo showCase
  liToRemove.remove();
  //rimuovo dalla lista utenti
  userList.splice(userList.indexOf(randomMember), 1);
  // aggiorno counter
  i++;

  /* if (userList.length === 0) {
     console.log('utenti finiti');
     return;
   } */

  /*  let i = 0;
  while (userList.length !== 0) {
    const randomMember = userList[Math.floor(Math.random() * userList.length)];
    const groupInTheMatrix = groups[i % groups.length];
    groupInTheMatrix.push(randomMember);

    userList.splice(userList.indexOf(randomMember), 1);
    i++;
  } */

  /* if (userList.length === 0) {
    //render
    console.log('time to render');
  } */

  //per ogni gruppo nei gruppi genera una lista e riempila
  /*   for (let i = 0; i < groups.length; i++) {
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
  } */
});

resetBtn.addEventListener('click', () => {
  userList.length = 0;
  groups.length = 0;
  i = 0;
  firstColForm.classList.remove('col-sm-6');
  showcaseList.classList.remove('animate__fadeInRight');
  showcaseList.classList.add('animate__fadeOutRight');
  setTimeout(() => {
    showcaseList.classList.add('d-none');
  }, 500);
  teamsSection.innerHTML = '';
});
