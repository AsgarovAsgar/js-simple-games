'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
const header = document.querySelector('.header')

const allSections = document.querySelectorAll('.section')
console.log(allSections);

const allButtons = document.getElementsByTagName('button')
console.log(allButtons);

const message = document.createElement('div')

message.classList.add('cookie-messagge')
message.innerHTML = `We use cookies for better functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`

// header.prepend(message)
header.append(message);
// header.before(message);
// header.after(message);

// delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  // message.remove
  message.parentElement.removeChild(message)
})

message.style.backgroundColor = '#37383d'
message.style.width = '100%'

//attributes
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

