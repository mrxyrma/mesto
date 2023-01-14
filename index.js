import {initialCards, cards} from './js/InitialCards.js';
import Card from './js/Card.js';
import FormValidation from "./js/FormValidator.js";

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

  if ((inputName.value !== profileName.innerText || inputDescr.value !== profileDescr.innerText) &&
      inputName.validity.valid && inputDescr.validity.valid) {
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


//Навешивание валидации на все формы на странице
const formList = Array.from(document.getElementsByTagName('form'));
formList.forEach(formElement => new FormValidation(formElement).enableValidation());