let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cards = document.querySelector('.cards');
renderCards();

const editBtn = document.querySelector('.profile__edit'),
      closeBtn = document.querySelectorAll('.close-button'),
      form = document.querySelector('.edit-form__form'), //форма редактирования профиля
      cardsTitle = document.querySelectorAll('.cards__title'), //
      addCardButton = document.querySelector('.pofile__add'),
      addForm = document.querySelector('.new-card__form');

let profileName = document.querySelector('.profile__title'),
    profileDescr = document.querySelector('.profile__description'),
    inputName = document.querySelector('.edit-form__name'),
    inputDescr = document.querySelector('.edit-form__desr'),
    newCardName = document.querySelector('.new-card__name'),
    newCardLink = document.querySelector('.new-card__link');


//Открытие модального окна для редактирования данных профиля
editBtn.addEventListener('click', () => {
  inputName.value = profileName.innerText;
  inputDescr.value = profileDescr.innerText;
  document.querySelector('.edit-form').style.display = 'flex';
});


//Закрытие модальных окон
closeBtn.forEach(closeBtn => closeBtn.addEventListener('click', closeModal));

function closeModal(event) {
  event.path[2].style.display = 'none';
  console.log(event);
}


//Отправка данных из модального окна редактирования профиля
form.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  
  profileName.innerText = inputName.value;
  profileDescr.innerText = inputDescr.value;

  closeModal(event);
}


//Отображение модального окна для добавления новой карточки
addCardButton.addEventListener('click', () => {
  document.querySelector('.new-card').style.display = 'flex';
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newCardName.value && newCardLink.value) {
    initialCards.unshift({'name': newCardName.value, 'link': newCardLink.value});
    renderCards(initialCards);

    closeModal(e);
    newCardName.value = '';
    newCardLink.value = '';
  }
});


//Функционал лайка
cards.addEventListener('click', (e) => {
  if(e.target.className.includes('cards__like')) {
    e.target.classList.toggle('cards__liked');
  }
});


//Удаление карточки
cards.addEventListener('click', (e) => {
  if (e.target.className == 'cards__delete-item') {
    e.target.closest('.cards__item').remove();
  }
});


//Открытие попапа с картинкой крупным планом
cards.addEventListener('click', (e) => {
  if(e.target.className === 'cards__image') {
    document.querySelector('.footer').insertAdjacentHTML('afterend', `
    <section class="image-popup">
      <div class="image-popup__wrapper">
        <img class="image-popup__img" src="${e.target.src}" alt="${e.path[1].innerText}">
        <p class="image-popup__descr">${e.path[1].innerText}</p>
        <button class="close-button close-popup"></button>
      </div>
    </section>
  `);
    const closePopup = document.querySelector('.close-popup'),
          popupWindow = document.querySelector('.image-popup');

    closePopup.addEventListener('click', () => {
      popupWindow.remove();
    })
  }
});


// Изначальная отрисовка карточек
function renderCards() {
  cards.innerHTML = '';
  initialCards.forEach((item) => {
    cards.innerHTML += `
      <li class="cards__item">
      <img class="cards__image" src=${item.link} alt=${item.name}>
      <div class="cards__descr">
        <h2 class="cards__title">${item.name}</h2>
        <button class="cards__like"></button>
        <button class="cards__delete-item"></button>
      </div>
      </li>
    `
  });
}