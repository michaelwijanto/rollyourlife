function rollDice() {
  return Math.ceil(Math.random() * 8);
}

function dokter(balance) {
  balance -= 2000;
  console.log(
    `Anda sakit, jadi anda terpaksa ke dokter.\n Balance anda berkurang sebanyak 2000.\n Sisa balance anda ${balance}`
  );
  return balance;
}

function bansos(balance) {
  balance += 1000;
  console.log(
    `Bantuan pemerintah telah beredar. Anda mendapatkan 1000.\n Balance anda sekarang ${balance}`
  );
  return balance;
}

function investasi(balance, dice) {
  let string = `Anda mendapatkan tawaran untuk berinvestasi. Anda merasa beruntung jadi anda memutuskan untuk invest.`;
  if (dice > 4) {
    balance += balance * 0.2;
    string += `\n Perasaan anda tepat! Investasi anda berbuah sebesar 20%. Balance anda sekarang ${balance}`;
  } else {
    balance -= balance * 0.2;
    string += `\n Sayangnya perasaan anda kurang tepat. Balance anda sekarang ${balance}`;
  }
  console.log(string);
  return balance;
}

function nikah(balance) {
  balance -= 4000;
  console.log(
    `Selain didesak oleh kekasih anda, anda merasa hari ini merupakan hari baik untuk menikah. Balance anda berkurang 4000. Sisa balance anda ${balance}`
  );
  return balance;
}

function istriHamil(balance) {
  balance += 2500;
  console.log(
    `Kabar gembira untuk anda! Keluarga anda mulai sekarang akan bertambah 1. Teman-teman anda ikut bergembira dan memberi anda hadiah dini sebesar 2500.\n Balance anda sekarang ${balance}`
  );
  return balance;
}

function naikJabat(balance) {
  balance += 4000;
  console.log(
    `Anda mendapat kabar bahwa anda telah dinaikan jabatannya. Balance bertambah 4000.\n Balance anda sekarang ${balance}`
  );
  return balance;
}

function tetanggaHamil(balance) {
  balance -= 2500;
  console.log(
    `Kabar gembira untuk tetangga anda! Istri tetangga hamil sehingga mereka berpesta. Anda mengikuti pesta mereka dan memberi hadiah dini sebesar 2500. Balance anda sekarang ${balance}`
  );
  return balance;
}

function hacktiv8(balance, dice) {
  if (dice > 4) {
    balance += 6000;
    console.log(
      `Anda memutuskan untuk mengikuti hacktiv8. Setelah membayar dan mengikuti kelas dengan giat, anda lulus dan mendapatkan pekerjaan tambahan. Balance anda bertambah 6000.\n Balance anda sekarnag ${balance}`
    );
  } else {
    balance -= 6000;
    console.log(
      `Anda memutuskan untuk mengikuti hacktiv8. Setelah membayar anda mengikuti kelas dengan giat.\n Namun sayangnya anda gugur dalam fase pembelajaran. Balance anda berkurang 6000.\n Balance anda sekarang ${balance}`
    );
  }
  return balance;
}

function events(dice, balance) {
  if (dice == 1) {
    return dokter(balance);
  }
  if (dice == 2) {
    return bansos(balance);
  }
  if (dice == 3) {
    return investasi(balance, Math.floor(Math.random() * 10));
  }
  if (dice == 4) {
    return nikah(balance);
  }
  if (dice == 5) {
    return istriHamil(balance);
  }
  if (dice == 6) {
    return naikJabat(balance);
  }
  if (dice == 7) {
    return tetanggaHamil(balance);
  }
  if (dice == 8) {
    return hacktiv8(balance, Math.floor(Math.random() * 10));
  }
}

function gameStart() {
  let rounds = 1;
  const balanceAwal = 10000;
  let balance = 10000;
  let marriageCheck = false;
  let rolling = 0;
  while (rounds < 11) {
    rolling = rollDice();
    console.log(`${rolling} <----------------------- ronde ${rounds}`);

    // check if married if dice lands on istri hamil (5)
    if (rolling == 5 && !marriageCheck) {
      console.log(`belum kawin mas`);
      continue;
    }

    //check if already married if dice lands on nikah (4)
    if (rolling == 4) {
      if (marriageCheck) {
        console.log(`udah kawin mas`);
        continue;
      }
      marriageCheck = true;
    }

    balance = events(rolling, balance);
    console.log(balance);

    //jika balance < 0, balikan balance ke 0 dan game selesai
    if (balance < 0) {
      balance = 0;
      break;
    }
    rounds++;
  }

  if (balance == 0) {
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

console.log(gameStart());
