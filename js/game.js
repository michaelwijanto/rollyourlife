function rollDice() {
  return Math.ceil(Math.random() * 8);
}

function dokter(player) {
  if (player.balance <= 0) {
    return balanceHabis(player);
  }
  player.balance -= 2000;
  player.lastEvent = `Anda sakit, jadi anda terpaksa ke dokter.\n Balance anda berkurang sebanyak 2000.\n Sisa balance anda ${player.balance}`;
  return player;
}

function bansos(player) {
  player.balance += 1000;
  player.lastEvent = `Bantuan pemerintah telah beredar. Anda mendapatkan 1000.\n Balance anda sekarang ${player.balance}`;
  return player;
}

function investasi(player) {
  if (player.balance <= 0) {
    player.lastEvent = `Anda mendapatkan tawaran untuk berinvestasi namun sayang sekali balance anda kosong. Jadi anda menolak investasi`;
    return balanceHabis(player);
  }
  let string = `Anda mendapatkan tawaran untuk berinvestasi. Anda merasa beruntung jadi anda memutuskan untuk invest.`;
  if (player.diceOption > 6) {
    player.balance += player.balance * 0.2;
    string += `\n Perasaan anda tepat! Investasi anda berbuah sebesar 20%. Balance anda sekarang ${player.balance}`;
  } else {
    player.balance -= player.balance * 0.2;
    string += `\n Sayangnya perasaan anda kurang tepat. Balance anda sekarang ${player.balance}`;
  }
  player.lastEvent = string;
  return player;
}

function nikah(player) {
  if (player.balance <= 0) {
    return balanceHabis(player);
  }
  player.balance -= 4000;
  player.lastEvent = `Selain didesak oleh kekasih anda, anda merasa hari ini merupakan hari baik untuk menikah. Balance anda berkurang 4000. Sisa balance anda ${player.balance}`;
  return player;
}

function istriHamil(player) {
  player.balance += 2500;
  player.lastEvent = `Kabar gembira untuk anda! Keluarga anda mulai sekarang akan bertambah 1. Teman-teman anda ikut bergembira dan memberi anda hadiah dini sebesar 2500.\n Balance anda sekarang ${player.balance}`;
  return player;
}

function naikJabat(player) {
  player.balance += 4000;
  player.lastEvent = `Anda mendapat kabar bahwa anda telah dinaikan jabatannya. Balance bertambah 4000.\n Balance anda sekarang ${player.balance}`;
  return player;
}

function tetanggaHamil(player) {
  if (player.balance <= 0) {
    return balanceHabis(player);
  }
  player.balance -= 2500;
  player.lastEvent = `Kabar gembira untuk tetangga anda! Istri tetangga hamil sehingga mereka berpesta. Anda mengikuti pesta mereka dan memberi hadiah dini sebesar 2500. Balance anda sekarang ${player.balance}`;
  return player;
}

function hacktiv8(player) {
  if (player.diceOption > 4) {
    player.balance += 6000;
    player.lastEvent = `Anda memutuskan untuk mengikuti hacktiv8. Setelah membayar dan mengikuti kelas dengan giat, anda lulus dan mendapatkan pekerjaan tambahan. Balance anda bertambah 6000.\n Balance anda sekarnag ${player.balance}`;
  } else {
    if (player.balance == 0) {
      return balanceHabis(player);
    }
    player.balance -= 6000;
    player.lastEvent = `Anda memutuskan untuk mengikuti hacktiv8. Setelah membayar anda mengikuti kelas dengan giat.\n Namun sayangnya anda gugur dalam fase pembelajaran. Balance anda berkurang 6000.\n Balance anda sekarang ${player.balance}`;
  }
  return player;
}

function diceToEvent(dice) {
  let events = [
    "dokter",
    "bansos",
    "investasi",
    "nikah",
    "istriHamil",
    "naikJabat",
    "tetanggaHamil",
    "hacktiv8",
  ];
  return events[dice - 1];
}

function events(action, player) {
  if (action == "dokter") {
    player.diceOption = -1;
    return dokter(player);
  }
  if (action == "bansos") {
    player.diceOption = -1;
    return bansos(player);
  }
  if (action == "investasi") {
    player.diceOption = Math.floor(Math.random() * 10);
    return investasi(player);
  }
  if (action == "nikah") {
    player.diceOption = -1;
    return nikah(player);
  }
  if (action == "istriHamil") {
    player.diceOption = -1;
    return istriHamil(player);
  }
  if (action == "naikJabat") {
    player.diceOption = -1;
    return naikJabat(player);
  }
  if (action == "tetanggaHamil") {
    player.diceOption = -1;
    return tetanggaHamil(player);
  }
  if (action == "hacktiv8") {
    player.diceOption = Math.floor(Math.random() * 10);
    return hacktiv8(player);
  }
}

function result(balance, balanceAwal) {
  if (balance <= 0) {
    return `anda tidak dapat bermain lagi`;
  }
  if (balance < balanceAwal) {
    return `anda tidak hogi`;
  }
  if (balance == balanceAwal) {
    return `anda flat`;
  }
  return `anda untung`;
}

function balanceHabis(player) {
  player.lastEvent = `Balance anda kosong. Perjalanan anda hanya sampai disini. <br> -------------GAMEOVER-------------`;
  return player;
}

function rollTheDice(player) {
  player.dice = rollDice();
  // console.log(player.dice, `<<<<<<<<<<<`);
  //if dice is 5 but not married
  while (player.dice == 5 && !player.marriage) {
    // console.log(`caught at dice = 5`);
    player.dice = rollDice();
  }

  //if dice is 4 but alr married
  if (player.dice == 4) {
    console.log(`caught dice = 4, checking marriage ${player.marriage}`);
    if (!player.marriage) {
      player.marriage = true;
    } else {
      while (player.dice == 4 && player.marriage) {
        player.dice = rollDice();
      }
    }
  }

  while (player.dice == player.lastDice) {
    let fate = Math.random() * 5;
    if (fate <= 3) {
      player.dice = rollDice();
    }
  }

  // if(player.balance == 0)
  let action = diceToEvent(player.dice);
  let temp = player.balance; //<-- save previous balance
  player = events(action, player);
  let tempObj = {
    action: action,
    dice: player.dice,
    balanceThen: temp,
    balanceNow: player.balance,
  };
  if (player.diceOption != -1) {
    tempObj.diceOption == player.diceOption;
  }
  // console.log(player, player.history);
  player.history.push(tempObj);
  // console.log(player);
  return player;
}

// let eventStatus = "";

// let history = []; //<------ put dice number and the event
// let balance = 10000;
// let marriageCheck = false;

let player = {
  name: "bejo",
  balance: 10000,
  marriage: false,
  dice: 0,
  lastDice: 0,
  diceOption: 0,
  history: [], //<--- put a log
  lastEvent: "", //<--store last event message
};

//DOM
let rollButton = document.getElementById("roll");
let paragraph = document.getElementById("test");
let counter = document.getElementById("counter");
let actions = document.getElementById("actions");
let resetButton = document.getElementById("reset");
let count = 1;
rollButton.addEventListener("click", () => {
  console.log(`clicked`);
  // console.log(player);
  player = rollTheDice(player);
  // console.log(player.dice);
  let i = player.history.length - 1;

  if (player.history[i].balanceThen == player.history[i].balanceNow) {
    rollButton.disabled = true;
    rollButton.innerText = "GAME OVER";
  }
  if (count == 10) {
    rollButton.disabled = true;
    rollButton.innerText = "GAME OVER";
    actions.innerHTML += "<br>" + result(player.balance, 10000);
  }
  counter.value = count++;
  paragraph.innerHTML += `Dadu: ${player.history[i].dice} || Balance: ${player.history[i].balanceThen} --> ${player.history[i].balanceNow} || Action: ${player.history[i].action}<br>`;
  actions.innerHTML = player.lastEvent;
});

resetButton.addEventListener("click", () => {
  count = 1;
  paragraph.innerHTML = "";
  counter.value = 0;
  actions.innerHTML = "NEW GAME";
  player = {
    name: "bejo",
    balance: 10000,
    marriage: false,
    dice: 0,
    lastDice: 0,
    diceOption: 0,
    history: [], //<--- put a log
    lastEvent: "", //<--store last event message
  };
});
