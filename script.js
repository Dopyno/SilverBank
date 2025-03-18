'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//*     Scroll to section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//?  ============      Button scrolling =====================
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // DOMRect {x: 0, y: 0, width: 1168, height: 1000, top: 0, …}
  console.log(e.target.getBoundingClientRect()); // Show the coordonate in page
  console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // })

  section1.scrollIntoView({ behavior: 'smooth' });
});

//? =============  Page navigation ===========
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

//*    ===   1.Add event listener to common parent element
//*    ===   2.Determine what element originated the

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //?   Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//?  ============  Tabbed component  =============

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //Remove active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //?   Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//? ======== Menu fade animation ==============

const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    //logo.style.opacity = this;
  }
};

//Passing an "argument" into handler
//Bind return another function  similar with function(e){handleOver(e , 0.5)}
nav.addEventListener('mouseover', handleOver.bind(0.5));

nav.addEventListener('mouseout', handleOver.bind(1));

//?   ======= Sticky navigation ==========

// const initialCoords = section1.getBoundingClientRect();
// console.log();
// initialCoords;
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//?  ========  Sticky navigation: Intersection Observer API

header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
//console.log(allSection);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
//console.log(allButtons);

//console.log(document.getElementsByClassName('btn'));

//*  Creating and inserting elements

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // 1st child - insert an element as the first child in the header element
// header.append(message); // last child - insert an element as the last child in the header element
// header.append(message.cloneNode(true)); // clone the element and insert it as the last child in the header element - in the same time

//header.before(message); // insert an element before the header element
// header.after(message); // insert an element after the header element

//* Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//*    Event Listener

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 4000);

// // going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes );
// console.log(h1.children );
// console.log();
// h1.firstElementChild.style.color = 'white'
// h1.firstElementChild.style.color = 'orange'

// //Going upwards
// console.log(h1.parentElement);
// console.log(h1.parentNode);

// h1.closest('h1').style.background = 'var(--gradient-primary)'
// h1.closest('header').style.background = 'var(--gradient-secondary)'

// // Going sideway: siblings
// console.log(h1.previousSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

/////////////////////////////////////////////////////////////////////////
//*     Styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //*     Attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //*     Data attributes

// console.log(logo.dataset.versionNumber);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// }

// Random color rgb(255, 255, 255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   //this.style.backgroundColor = randomColor()

//   // Stop propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   //this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   //this.style.backgroundColor = randomColor();
// });
