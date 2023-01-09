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
      editForm = document.querySelector('.edit-form__form'),
      cardsTitle = document.querySelectorAll('.cards__title'),
      addCardButton = document.querySelector('.pofile__add'),
      addForm = document.querySelector('.new-card__form'),
      modalOverlay = document.querySelectorAll('.modal__overlay');

let profileName = document.querySelector('.profile__title'),
    profileDescr = document.querySelector('.profile__descr'),
    inputName = document.querySelector('#edit-form__title'),
    inputDescr = document.querySelector('#edit-form__descr'),
    newCardName = document.querySelector('#new-card__name'),
    newCardLink = document.querySelector('#new-card__link');


//Открытие модального окна для редактирования данных профиля
editBtn.addEventListener('click', () => {
  inputName.value = profileName.innerText;
  inputDescr.value = profileDescr.innerText;
  editForm.querySelector('.modal__save-button').classList.add('modal__save-button_inactive');
  document.querySelector('.edit-form').classList.add('modal__open');
  document.addEventListener('keydown', closeByEsc);
});


//Закрытие модальных окон
closeBtn.forEach(closeBtn => closeBtn.addEventListener('click', closeModal));

function closeModal() {
  document.querySelector('.modal__open').classList.remove('modal__open');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(e){
  if (e.key === 'Escape') {
    closeModal();
  }
}

modalOverlay.forEach(item => {
  item.addEventListener('click', e => {
    if(e.target == e.currentTarget) {
      closeModal();
    }
  });
  }
 );


//Отправка данных из модального окна редактирования профиля
editForm.addEventListener('submit', e => {
  e.preventDefault();

  if (inputName.value !== profileName.innerText || inputDescr.value !== profileDescr.innerText) {
    profileName.innerText = inputName.value;
    profileDescr.innerText = inputDescr.value;
    closeModal();
  }
});


//Отображение модального окна для добавления новой карточки
addCardButton.addEventListener('click', () => {
  addForm.querySelector('.modal__save-button').classList.add('modal__save-button_inactive');
  document.querySelector('.add-form').classList.add('modal__open');
  document.addEventListener('keydown', closeByEsc);
});


//Добавление новой карточки на страницу
addForm.addEventListener('submit', e => {
  e.preventDefault();
  if (newCardName.value && newCardLink.value) {
    new Card(newCardName.value, newCardLink.value, cards).addCard();

    closeModal();

    newCardName.value = '';
    newCardLink.value = '';
  }
});


//Функционал лайка
cards.addEventListener('click', e => {
  if(e.target.className.includes('cards__like')) {
    e.target.classList.toggle('cards__liked');
  }
});


//Удаление карточки
cards.addEventListener('click', e => {
  if (e.target.className == 'cards__delete-item') {
    e.target.closest('.cards__item').remove();
  }
});


//Открытие попапа с картинкой крупным планом
cards.addEventListener('click', e => {
  if(e.target.className === 'cards__image') {
    document.querySelector('.footer').insertAdjacentHTML('afterend', `
    <section class="image-popup modal__open">
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
  
    function removePopupByEsc(e) {
      if (e.key === 'Escape') {
        popupWindow.remove();
        document.removeEventListener('keydown', removePopupByEsc);
      }
    }

    document.addEventListener('keydown', removePopupByEsc);

    popupWindow.addEventListener('click', e => {
      if(e.target == e.currentTarget) {
        popupWindow.remove();
      }
    });
  }
});


//Валидация форм
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('modal__field_error');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('modal__field_error');
  errorElement.textContent = '';
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.modal__field'));
  const buttonElement = formElement.querySelector('.modal__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.getElementsByTagName('form'));
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
}

enableValidation();


//Блокировка кнопки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('modal__save-button_inactive');
  } else {
    buttonElement.classList.remove('modal__save-button_inactive');
  }
}


//Класс карточки
class Card {
  constructor(title, url, template) {
    this.title = title;
    this.url = url;
    this.template = template;
  }

  addCard() {
    initialCards.unshift({'name': this.title, 'link': this.url});
    
    this.template.insertAdjacentHTML('afterbegin', `
    <li class="cards__item">
    <img class="cards__image" src=${this.url} alt=${this.title}>
    <div class="cards__descr">
      <h2 class="cards__title">${this.title}</h2>
      <button class="cards__like"></button>
      <button class="cards__delete-item"></button>
    </div>
    </li>`);
  }
  
}

