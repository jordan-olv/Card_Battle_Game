//LISTE DES CLASSES
const card = [{
  name: 'Hexblade',
  spell: [{
    name: 'Attaque légère',
    icon: './assets/spell/hexblade_leger.png',
    dgt_min: 100,
    dgt_max: 120,
  },
  {
    name: 'Attaque Lourde',
    icon: './assets/spell/hexblade_lourde.png',
    dgt_min: 1,
    dgt_max: 35,
  },
  {
    name: 'Heal',
    icon: './assets/spell/heal.png',
    heal_min: 10,
    heal_max: 30,
  },],
  life: 200,
  taux_dodge: 10,
  taux_crit: 10,
  image: './assets/cards/card01.png'
},
{
  name: 'Hunter',
  spell: [{
    name: 'Attaque légère',
    icon: './assets/spell/hexblade_leger.png',
    dgt_min: 10,
    dgt_max: 20,
  },
  {
    name: 'Attaque Lourde',
    icon: './assets/spell/hexblade_lourde.png',
    dgt_min: 1,
    dgt_max: 35,
  },
  {
    name: 'Heal',
    icon: './assets/spell/heal.png',
    heal_min: 10,
    heal_max: 30,
  },],
  life: 175,
  taux_dodge: 20,
  taux_crit: 17,
  image: './assets/cards/card07.png'
},
{
  name: 'Scavenger',
  spell: [{
    name: 'Attaque légère',
    icon: './assets/spell/hexblade_leger.png',
    dgt_min: 10,
    dgt_max: 20,
  },
  {
    name: 'Attaque Lourde',
    icon: './assets/spell/hexblade_lourde.png',
    dgt_min: 1,
    dgt_max: 35,
  },
  {
    name: 'Heal',
    icon: './assets/spell/heal.png',
    heal_min: 10,
    heal_max: 30,
  },],
  life: 250,
  taux_dodge: 3,
  taux_crit: 8,
  image: './assets/cards/card03.png'
}]

//LISTE DES JOUEURS
const player = [{
  id: 1,
  name: 'Player 1',
  class: '',
  life: 0,
  life_max: 0,
},
{
  id: 2,
  name: 'Player 2',
  class: '',
  life: 0,
  life_max: 0,
}]

//LISTE DES MAPS
const map = ['./assets/maps/1.png', './assets/maps/2.png', './assets/maps/3.png']

// SECTIONS
const startGameSection = document.querySelector('section.start_game');
const choiceCardSection = document.querySelector('section.choice_cards');
const choiceMapSection = document.querySelector('section.choice_map');
const fightSection = document.querySelector('section.fight');

//TRUE = PLAYER 1 / FALSE = PLAYER 2
let playerTurn = true;

// LANCEMENT DU JEU
const startGame = () => {
  startGameSection.classList.add('hidden');
  createCards()
}

// CREATION DES CARTES
const createCards = () => {
  const choiceCardsContent = document.querySelector('.choice_cards_content');

  card.forEach(item => {
    choiceCardsContent.innerHTML += `
      <figure class="image-card" data-class="${item.name}">
      <h5>${item.name}</h5>
      <img src="${item.image}" alt="" />
      <figcaption id="${item.name.toLowerCase()}">

      </figcaption>
    </figure>`

    const spellBloc = document.querySelector(`#${item.name.toLowerCase()}`);
    const ul = document.createElement('ul');
    spellBloc.appendChild(ul);
    item.spell.forEach(sort => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${sort.icon}" class="iconSpell"> ` + sort.name;
      ul.appendChild(li)
    })
  })

  let figures = document.querySelectorAll('figure.image-card')
  for (let figure of figures) {
    figure.addEventListener("click", clickCards)
  }

  showCards();
};

// AFFICHAGE DES CARTES
const showCards = () => {
  setTimeout(() => {
    document.querySelector('.choice_cards_content').style.opacity = 1;
  }, 500)

  choiceCardSection.classList.remove('hidden');
  const playerTurnDisplay = document.querySelector('.choice_cards .choice_class_text')
  choiceCardSection.classList.remove('hidden');
  if (playerTurn) {
    playerTurnDisplay.setAttribute('data-value', 'JOUEUR 1 \n CHOISIS TA CLASSE');
  } else {
    playerTurnDisplay.setAttribute('data-value', 'JOUEUR 2 \n CHOISIS TA CLASSE');

  }
}

// CHOIX DE LA CLASSE
const clickCards = (e) => {
  document.querySelector('.choice_cards_content').style.opacity = 0;
  const inputName = document.querySelector('.choice_cards input');

  //ENREGISTREMENT DES INFOS DES JOUEURS
  if (playerTurn) {
    const idClass = card.findIndex((element) => element.name == e.target.parentNode.dataset.class);
    player[0].name = inputName.value;
    player[0].class = card[idClass].name;
    player[0].life = card[idClass].life;
    player[0].life_max = card[idClass].life;

    playerTurn = false;

    inputName.value = 'Player 2'
    showCards()
  } else {

    const idClass = card.findIndex((element) => element.name == e.target.parentNode.dataset.class);
    player[1].name = inputName.value;
    player[1].class = card[idClass].name;
    player[1].life = card[idClass].life;
    player[1].life_max = card[idClass].life;

    playerTurn = true;
    choiceCardSection.classList.add('hidden');
    showMap();
  }
}

// CHOIX DE LA MAP
const showMap = () => {
  const choiceMapList = document.querySelector('.choice_map_list')

  map.forEach(map => {
    const map_item = document.createElement('img')
    map_item.src = map;
    choiceMapList.appendChild(map_item)
  })
  choiceMapSection.classList.remove('hidden');

  let maps_img = document.querySelectorAll('.choice_map_list img');
  maps_img.forEach(map_event => {
    map_event.addEventListener("click", function (e) {
      document.body.style.backgroundImage = 'url("")';
      document.body.style.backgroundColor = '#9C797E7a';
      fight_content.style.backgroundImage = `url('${e.target.src}')`;
      choiceMapSection.classList.add('hidden');
      startFight();
    })
  })

}

// LANCEMENT DU COMBAT
// ON RECUPERE LES BLOCS QUI SERONT MODIFIE
const fight_content = document.querySelector('.fight_content');
const divPlayerOne = document.querySelector('.fight__player.one .null');
const divPlayerTwo = document.querySelector('.fight__player.two .null');
const spellContent = document.querySelectorAll('.fight__player__spell');
const lifeBar = document.querySelectorAll('.life__barre');
const showTurn = document.querySelector('.fight_content_turn');

const startFight = () => {
  createOvPlayer();
  fightSection.classList.remove('hidden');
  showTurn.setAttribute('data-value', 'JOUEUR 1');
}

// CREATION DES OVERLAY PLAYER
const createOvPlayer = () => {
  updateLife();
  const playerName = document.querySelectorAll('.fight__player__infos>p:first-child');
  player.forEach((item, pos) => {
    const idClass = card.findIndex((element) => element.name == item.class);
    card[idClass].spell.forEach(spell => {
      const spell_item = document.createElement('div');
      const spell_item_img = document.createElement('img');
      spell_item_img.src = spell.icon;

      spell_item.classList.add('test')
      spell_item.addEventListener('click', function () {
        const playerAttacked = pos === 0 ? player[1] : player[0];
        const playerAttack = pos === 0 ? player[0] : player[1];
        attack(spell, playerAttack, playerAttacked);
      })
      spell_item.appendChild(spell_item_img)
      spellContent[pos].appendChild(spell_item)
    })

    if (pos === 0) {
      divPlayerOne.style.backgroundImage = `url('${card[idClass].image}')`;
      playerName[pos].innerHTML = item.name;
    } else {
      divPlayerTwo.style.backgroundImage = `url('${card[idClass].image}')`;
      playerName[pos].innerHTML = item.name;
    }
  })

}

// LANCEMENT D'UNE ATTAQUE
const attack = (spell, playerAttack, playerAttacked) => {
  const classPlayer = card.filter(x => x.name == playerAttack.class);
  // console.log(classPlayer[0])
  let critiqueCalc = getRdmNumber(0, 100);
  console.log('crit', critiqueCalc, classPlayer[0].taux_crit)
  let critique = false;
  if (critiqueCalc < classPlayer[0].taux_crit) {
    console.log('critique', critiqueCalc, classPlayer[0].taux_crit)
    critique = true;
  }
  if (spell.name == 'Heal') {
    let heal = getRdmNumber(spell.heal_min, spell.heal_max);
    if (critique) {
      heal = Math.round(heal * 1.4);
    }
    playerAttack.life += Math.round(heal);

    if (playerAttack.life > playerAttack.life_max) {
      playerAttack.life = playerAttack.life_max
    }
    notifAttack(playerAttack, heal, spell, critique);
    updateLife();
  } else {
    let dgt = getRdmNumber(spell.dgt_min, spell.dgt_max);
    if (critique) {
      dgt = Math.round(dgt * 1.4);
    }
    playerAttacked.life -= dgt;

    const randomX = Math.random() * divPlayerOne.clientWidth;
    const randomY = Math.random() * divPlayerOne.clientHeight;

    const blood = document.createElement('img');
    blood.src = './assets/blood.png';
    blood.style.top = randomY + 'px';
    blood.style.left = randomX + 'px';
    blood.classList.add('blood');

    if (playerAttacked.id === 1) {
      divPlayerOne.appendChild(blood);

      divPlayerOne.style.animationPlayState = "running";

      setTimeout(() => {
        divPlayerOne.style.animationPlayState = "paused";
      }, 700);
    }
    else {
      divPlayerTwo.appendChild(blood);
      divPlayerTwo.style.animationPlayState = "running";

      setTimeout(() => {
        divPlayerTwo.style.animationPlayState = "paused";
      }, 700);
    }

    notifAttack(playerAttack, dgt, spell, critique);
    console.log(playerAttack.life);
    console.log(dgt)
    updateLife(playerAttack, playerAttacked);
    console.log(playerAttack.life);
  }

  updateTurn();

}

// NOTIFICATION D'ATTAQUE
let notifArray = [];
let allNotifArray = [];
const notifAttack = (player, dgt, spell, critique) => {
  const notifLogs = document.querySelector('.fight_content_logs');
  const notif = document.createElement('p');
  if (spell.name == 'Heal') {
    notif.classList.add('notif_heal');
    if (critique) {
      notif.classList.add('notif_crit');
    }
    notif.innerHTML = `<img src="${spell.icon}"> ${player.name} se soigne de ${dgt} points de vie`;
  } else {
    notif.classList.add('notif_attack');
    if (critique) {
      notif.classList.add('notif_crit');
    }
    notif.innerHTML = `<img src="${spell.icon}"> ${player.name} attaque de ${dgt} points de vie`;
  }

  notif.classList.remove('attackPlayerOne', 'attackPlayerTwo');
  if (player.id === 1) {
    notif.classList.add('attackPlayerOne');
  }
  else {
    notif.classList.add('attackPlayerTwo');
  }

  player.id === 1 ? notif.style.textAlign = 'left' : notif.style.textAlign = 'right';
  player.id === 1 ? notif.style.alignSelf = 'flex-start' : notif.style.alignSelf = 'flex-end';
  player.id === 1 ? notif.classList.add('attackPlayerOne') : notif.classList.add('attackPlayerTwo');

  notifLogs.appendChild(notif);
  notifArray.push(notif);
  allNotifArray.push(notif);
  if (notifArray.length > 6) {
    notifArray[0].remove();
    notifArray.shift();
  }
}

// MISE A JOUR DE LA BARRE DE VIE
const updateLife = (playerAttack, playerAttacked) => {
  const playerName = document.querySelectorAll('.fight__player__infos>p:last-child');
  player.forEach(item => {
    const newWidth = (item.life / item.life_max) * 100;
    lifeBar[item.id - 1].style.setProperty('--lifeWidth', `${newWidth}%`);

    //Update color
    lifeBar[item.id - 1].style.setProperty('--bar-life', '#63ff00');

    if (newWidth <= 81) { //yellows
      lifeBar[item.id - 1].style.setProperty('--bar-life', '#d6ff00');
    }

    if (newWidth <= 66) { //yellows
      lifeBar[item.id - 1].style.setProperty('--bar-life', '#ffff00');
    }
    if (newWidth <= 50) { //yellows
      lifeBar[item.id - 1].style.setProperty('--bar-life', '#FF8E15');
    }
    if (newWidth <= 33) { //reds
      lifeBar[item.id - 1].style.setProperty('--bar-life', '#f53232');
    }
    if (newWidth <= 16) { //reds
      lifeBar[item.id - 1].style.setProperty('--bar-life', '#ff0000');
    }

    playerName[item.id - 1].textContent = `(${item.life}/${item.life_max})`;
  });

  if (playerAttacked) {
    if (playerAttacked.life <= 0) {
      playerName[playerAttacked.id - 1].textContent = '(0/100)';
      endGame(playerAttack, playerAttacked)
    }
  }
}

const updateTurn = () => {
  const fightBlock = document.querySelector('.fight__block');

  fightBlock.style.left = '';
  fightBlock.style.right = '';
  playerTurn ? fightBlock.style.left = 0 : fightBlock.style.right = 0;

  playerTurn = !playerTurn;
  showTurn.setAttribute('data-value', playerTurn ? 'JOUEUR 1' : 'JOUEUR 2');
}

const endGame = (playerWin, playerLose) => {
  console.log(playerWin.name, playerLose.name)
  const notifEnd = document.querySelector('.fight__end--content--bottom');
  const btnPlayAgain = document.querySelector('.playAgain');
  const endBloc = document.querySelector('.fight__end').style.display = 'flex';
  const endName1 = document.querySelector('.endName1').textContent = player[0].name;
  const endName2 = document.querySelector('.endName2').textContent = player[1].name;

  const idClass = card.findIndex((element) => element.name == player[0].class);
  const endImg1 = document.querySelector('.endImg1').src = card[idClass].image;
  const idClass2 = card.findIndex((element) => element.name == player[1].class);
  const endImg2 = document.querySelector('.endImg2').src = card[idClass2].image;
  const endText = document.querySelectorAll('.playerEnd h3:last-child')
  const endImgBloc = document.querySelectorAll('.endImgBloc');
  console.log(endImgBloc)
  endImgBloc[playerWin.id - 1].classList.add('endImgBlocWin');
  endImgBloc[playerLose.id - 1].classList.add('endImgBlocLose');
  endText[playerWin.id - 1].textContent = 'WINNER';
  endText[playerWin.id - 1].style.color = '#63ff00';
  endText[playerLose.id - 1].textContent = 'LOSER';
  endText[playerLose.id - 1].style.color = '#f53232';

  allNotifArray.forEach(item => {
    notifEnd.appendChild(item);
  });

  btnPlayAgain.addEventListener('click', () => {
    window.location.reload();
  });
}

// GENERATION D'UN NOMBRE ALEATOIRE
function getRdmNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}