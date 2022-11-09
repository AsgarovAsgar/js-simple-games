'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

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


// button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect(e);
  console.log(s1Coords);

  // scroll
  // window.scrollTo(s1Coords.left + window.pageXOffset, s1Coords.top + window.pageYOffset)

  // smooth scroll
  window.scrollTo({
    left: s1Coords.left + window.pageXOffset,
    top: s1Coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////
// PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log('link', id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// 1. Add event listener to the parent element
// 2. Determine which element originate that event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // matching strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// console.log(document.documentElement);
// console.log(document.head);
const header = document.querySelector('.header')

const allSections = document.querySelectorAll('.section')
// console.log(allSections);

const allButtons = document.getElementsByTagName('button')
// console.log(allButtons);

const message = document.createElement('div')

message.classList.add('cookie-messagge')
message.innerHTML = `We use cookies for better functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`

// header.prepend(message)
// header.append(message);
// header.before(message);
// header.after(message);

// delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//   // message.remove
//   message.parentElement.removeChild(message)
// })

// message.style.backgroundColor = '#37383d'
// message.style.width = '100%'

//attributes
const logo = document.querySelector('.nav__logo')
// console.log(logo.alt);
// console.log(logo.src);


// const h1 = document.querySelector('h1')
// const logH1 = function (e) {
//   console.log('hover hover hover');
// };

// h1.addEventListener('mouseenter', logH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', logH1);
// }, 5000)

// h1.onmouseenter = function(e) {
//   console.log('lololo', e);
// }


// ----- EVENT PROPAGATION -----
// random rgb color
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => {
  // console.log('bubbling happens');
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

  // console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   // console.log('link', e.target, e.currentTarget);
//   // console.log(this === e.currentTarget);

//   //stop propagation => not really good idea to implement to simple event handlings
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('nav-links', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('nav', e.target, e.currentTarget);
// });

// when we set it to TRUE, capturing happens.
// Instead of showing link first, it will show nav first in the console
// theoretical part


///////////////////////
// DOM TRAVERSING
const h1 = document.querySelector('h1')

// going downwards: children
console.log(h1.querySelectorAll('.highlight'));

console.log(h1.childNodes); //select everything inside of query
console.log(h1.children); //select only html elements
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered'

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// !!! important !!!
h1.closest('.header').style.background = 'var(--gradient-secondary)'
h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// holiday experiment
