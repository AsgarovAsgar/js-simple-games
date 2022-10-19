'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}


const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = balance + "€";

  acc.balance = balance
  console.log('account: ', acc);
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = incomes + "€";

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = Math.abs(out) + "€";

  const interest = acc.movements.filter(mov => mov > 0).map(mov => (mov * acc.interestRate)/100).filter((int, i, arr) => int >= 1).reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = interest + "€";
}

const user = 'Steven Thomas Williams'
const createUserNames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name.charAt(0)).join('')
  })
}
createUserNames(accounts)

const updateUI = function(acc) {
  // display movements
  displayMovements(acc.movements);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
}


let currentAccount
btnLogin.addEventListener('click', function(e) {
  e.preventDefault()

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()

    //update UI
    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault()
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  // console.log("transfer", amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc && 
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log("transfer is valid");

    // make transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    // clear input fields
    inputTransferTo.value = inputTransferAmount.value = ''
    inputTransferAmount.blur()

    //update UI
    updateUI(currentAccount);
  }
})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount)

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();

})

btnClose.addEventListener('click', function(e) {
  e.preventDefault()
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log("click", index)

    accounts.splice(index, 1)
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = 0;
  inputClosePin.blur();
})

let sorted = false
btnSort.addEventListener('click', function(e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})



const eurToUsd = 1.1

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd
// })

const movementsUSD = movements.map(mov => mov * eurToUsd);

const movementsDescription = movements.map((mov, i, arr) => {
  return `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} deposited ${Math.abs(mov)}`
})

// console.log(movementsDescription);

// const deposits = movements.filter(mov => mov > 0)

// const withdrawals = movements.filter((mov) => mov < 0);

// REDUCE METHOD

// const balance = movements.reduce(function(acc, cur, i, arr) {
//   return acc + cur
// }, 0)

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let bal = 0;
// for ( const mov of movements) {
//   bal += mov
// }
// console.log(bal)

//maximum value

// const max1 = movements.reduce(function(max, mov) {
//   console.log(mov);
//   mov > max ? max = mov : max
//   return max
// }, 0)

// console.log(max1);

// const calcAverageHumanAge = function(arr) {
//   const humanAges = arr.map(dogAge => dogAge <= 2 ? dogAge * 2 : dogAge * 4 + 16)

//   const adultHumanAges = humanAges.filter(humanAge => humanAge >= 18)

//   const averageHumanAge = adultHumanAges.reduce((acc, age) => acc + age, 0) / adultHumanAges.length
//   return averageHumanAge;
// }

// const arr1 = [5, 2, 4, 1, 15, 8, 3]
// const avg1 = calcAverageHumanAge(arr1)

// console.log(avg1);

// CHAINING ALL OF THEM

// const sum = movements.filter(mov => mov > 0).map(mov => mov * 1.1).reduce((acc, mov) => acc + mov, 0)

// console.log(sum);

// ---- FIND METHOD ----

// const firstWithdrawal = movements.find(mov => mov < 0)

// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account);

// ---- INCLUDES ----

// console.log(movements)
// console.log(movements.includes(-30));

// SOME
const anyDeposits = movements.some(mov => mov > 0)
// console.log(anyDeposits);

// EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every((mov) => mov > 0));


// FLAT
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements)
// const allMovements = accountMovements.flat()

// console.log(allMovements.reduce((acc, mov) => acc + mov, 0))


// Methods CHAINING
// const overallBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0)

// console.log(overallBalance);

// FLATMAP
// const overallBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2);  

// SORT Method // WILL MUTATE
// const owners = ['Jonas', 'Zack', 'Adam', 'Martha']
// console.log(owners.sort())

// console.log(movements);
// 
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// movements.sort((a, b) => {
//   if (a > b) return 1 
//   if (b > a) return -1; 
// })

// movements.sort((a, b) => a - b)

// console.log(movements);

// ARRAY FROM method

// labelBalance.addEventListener('click', function(e) {
//   e.preventDefault()
//   // const movementsUI = Array.from(
//   //   document.querySelectorAll('.movements__value'),
//   //   el => Number(el.textContent.replace('€', ''))
//   // )

//   // const movementsUI = document.querySelectorAll('.movements__value') is NOT possible AHHHAAA!!!
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'))
//   console.log(movementsUI.map((el) => el.textContent.replace("€", "")));

//   // const movementsUI2 = [...document.querySelectorAll(".movements__value")];
//   // console.log(movementsUI2); 
// })


// const bankDepositSum = accounts.map(acc => acc.movements).flat().filter(mov => mov > 0).reduce((sum, mov) => sum + mov, 0)
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0)

// const { deposits, withdrawals } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, mov) => {
//       // mov > 0 ? (sums.deposits += mov) : (sums.withdrawals += mov);
//       sums[mov > 0 ? "deposits" : "withdrawals"] += mov
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);

// const convertTitleCase = function(title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1)
//   const expections = ['a', 'an', 'the', 'but', 'or', 'in']

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((word) => (expections.includes(word) ? word : capitalize(word)))
//     .join(" ");
//   return capitalize(titleCase)
// }
// console.log(convertTitleCase('This is a nice title'));

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

//1.
dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28))
console.log(dogs);

//2.

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(dogSarah);
const message = dogSarah.curFood > dogSarah.recFood ? "Sarah's dog eats too much" : 'Not eat too much'
console.log(message);

// 3.
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners)
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.recFood === dog.curFood))

// 6.

const checkEatingOkay = (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
const dogsCopy = dogs.slice().sort((a,b) => a.recFood - b.recFood)
console.log(dogsCopy);

