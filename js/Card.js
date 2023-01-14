export default class Card {
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