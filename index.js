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


// Изначальная отрисовка карточек
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


const editBtn = document.querySelector('.profile__edit'),
      closeBtn = document.querySelectorAll('.close-button'),
      form = document.querySelector('.edit-form__form'),
      cardsTitle = document.querySelectorAll('.cards__title'),
      addCardButton = document.querySelector('.pofile__add'),
      addForm = document.querySelector('.new-card__form');

let profileName = document.querySelector('.profile__title'),
    profileDescr = document.querySelector('.profile__descr'),
    inputName = document.querySelector('.edit-form__title'),
    inputDescr = document.querySelector('.edit-form__desr'),
    newCardName = document.querySelector('.new-card__name'),
    newCardLink = document.querySelector('.new-card__link');


//Открытие модального окна для редактирования данных профиля
editBtn.addEventListener('click', (e) => {
  inputName.value = profileName.innerText;
  inputDescr.value = profileDescr.innerText;
  document.querySelector('.edit-form').style.display = 'flex';

  document.addEventListener('keydown', closeByEsc);

});


//Закрытие модальных окон
closeBtn.forEach(closeBtn => closeBtn.addEventListener('click', closeModal));

function closeModal(e) {
  e.target.closest('section').style.display = 'none';
  document.removeEventListener('keydown', closeByEsc);
}


//Отправка данных из модального окна редактирования профиля
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  
  profileName.innerText = inputName.value;
  profileDescr.innerText = inputDescr.value;

  closeModal(e);
}


//Отображение модального окна для добавления новой карточки
addCardButton.addEventListener('click', () => {
  document.querySelector('.add-form').style.display = 'flex';

  document.addEventListener('keydown', closeByEsc);

});

function closeByEsc(e){
  if (e.key === 'Escape') {
    console.log('dddd');
    closeModal(e);
  }
}

//Добавление новой карточки на страницу
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newCardName.value && newCardLink.value) {
    initialCards.unshift({'name': newCardName.value, 'link': newCardLink.value});
   
    cards.insertAdjacentHTML('afterbegin', `
    <li class="cards__item">
    <img class="cards__image" src=${newCardLink.value} alt=${newCardName.value}>
    <div class="cards__descr">
      <h2 class="cards__title">${newCardName.value}</h2>
      <button class="cards__like"></button>
      <button class="cards__delete-item"></button>
    </div>
    </li>
  `);

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
    console.log(e);
    document.querySelector('.footer').insertAdjacentHTML('afterend', `
    <section class="image-popup">
      <div class="image-popup__wrapper">
        <img class="image-popup__img" src="${e.target.src}" alt="${e.target.closest('.cards__item').innerText}">
        <p class="image-popup__descr">${e.target.closest('.cards__item').innerText}</p>
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