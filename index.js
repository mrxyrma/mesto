let initialCards = [
  {
    title: 'Архыз',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cards = document.querySelector('.cards');

//Класс карточки
class Card {
  constructor(title, url, template) {
    this.title = title;
    this.url = url;
    this.template = template;
  }

  _murkup() {
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

  _likeCard() {
    document.querySelector('.cards__like').addEventListener('click', e => {
      if(e.target.className.includes('cards__like')) {
        e.target.classList.toggle('cards__liked');
      }
    });
  }

  _deleteCard() {
    document.querySelector('.cards__delete-item').addEventListener('click', e => {
      e.target.closest('.cards__item').remove();
    });
  }

  _popup() {
    document.querySelector('.cards__image').addEventListener('click', e => {
      if(e.currentTarget.className === 'cards__image') {
        document.querySelector('.footer').insertAdjacentHTML('afterend', `
        <section class="image-popup modal__open">
          <div class="image-popup__wrapper">
            <img class="image-popup__img" src="${e.currentTarget.src}" alt="${e.currentTarget.closest('.cards__item').innerText}">
            <p class="image-popup__descr">${e.currentTarget.closest('.cards__item').innerText}</p>
            <button class="close-button close-popup"></button>
          </div>
        </section>`);

        const popupWindow = document.querySelector('.image-popup');
    
        document.querySelector('.close-popup').addEventListener('click', () => {
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
            document.removeEventListener('keydown', removePopupByEsc);
          }
        });
      }
    });
  }  

  addCard() {
    this._murkup();
    this._likeCard();
    this._deleteCard();
    this._popup();
  } 
}

// Изначальная отрисовка карточек
initialCards.forEach(item => new Card(item.title, item.url, cards).addCard());


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
    initialCards.unshift({'title': newCardName.value, 'url': newCardLink.value});
    new Card(newCardName.value, newCardLink.value, cards).addCard();

    closeModal();

    newCardName.value = '';
    newCardLink.value = '';
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