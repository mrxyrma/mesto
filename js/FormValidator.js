export default class FormValidation {
  constructor(formElement) {
    this.formElement = formElement;
  }

  //Показ сообщения ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('modal__field_error');
    errorElement.textContent = errorMessage;
  }

  //Удаление сообщения ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('modal__field_error');
    errorElement.textContent = '';
  }

  //Проверка на валидность
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  //Блокировка кнопки
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('modal__save-button_inactive');
    } else {
      buttonElement.classList.remove('modal__save-button_inactive');
    }
  }
  
  enableValidation() {
    const inputList = Array.from(this.formElement.querySelectorAll('.modal__field'));
    const buttonElement = this.formElement.querySelector('.modal__save-button');
  
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(this.formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}