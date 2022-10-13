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

const displayMovements = function(movements) {
  containerMovements.innerHTML = ''

  movements.forEach(function(mov, i) {
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

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = balance + "€";
};
calcDisplayBalance(account1.movements);

const calcDisplayMovements = function(movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = incomes + "€";

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = Math.abs(out) + "€";

  const interest = movements.filter(mov => mov > 0).map(mov => mov * 1.2/100).filter((int, i, arr) => int >= 1).reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = interest + "€";
}
calcDisplayMovements(account1.movements);

const user = 'Steven Thomas Williams'
const createUserNames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name.charAt(0)).join('')
  })
}
createUserNames(accounts)


// console.log(accounts);



const eurToUsd = 1.1

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd
// })

const movementsUSD = movements.map(mov => mov * eurToUsd);

const movementsDescription = movements.map((mov, i, arr) => {
  return `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} deposited ${Math.abs(mov)}`
})

// console.log(movementsDescription);

const deposits = movements.filter(mov => mov > 0)

const withdrawals = movements.filter((mov) => mov < 0);

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

const firstWithdrawal = movements.find(mov => mov < 0)

console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account);

