/**
 * Класс для создания пользовательского интерфейсного элемента ввода.
 * Позволяет подписаться на изменения значения ввода.
 *
 * @class
 * @classdesc Этот класс можно использовать для удобной подписки на элемент ввода
 */
class UIInput {
  /**
   * Ссылка на HTML элемент для ввода данных.
   * @private
   * @type {HTMLInputElement|null}
   */
  #inputHtmlElement = null;

  /**
   * Список функций-наблюдателей за изменениями значения ввода.
   * @private
   * @type {Function[]}
   */
  #observers = [];

  /**
   * Текущее значение элемента ввода.
   * @private
   * @type {number}
   */
  #valueInput = null;

  /**
   * Создает экземпляр UIInput.
   *
   * @constructor
   * @param {string} inputSelector - CSS селектор для выбора элемента ввода.
   * @param {string|number} valueInput - Начальное значение для элемента ввода.
   */
  constructor(inputSelector, valueInput = "") {
    this.#inputHtmlElement = document.querySelector(inputSelector);

    this.#valueInput = valueInput;

    this.#inputHtmlElement.addEventListener("input", this.#handleInput);
  }

  /**
   * Обрабатывает события ввода, валидирует и уведомляет наблюдателей.
   * @private
   * @param {Event} event - Событие ввода.
   */
  #handleInput = (event) => {
    const value = Number(event.target.value);
    this.#valueInput = isNaN(value) ? 0 : value;
    this.#send(this.#valueInput);
  };

  /**
   * Добавляет функцию-наблюдатель за изменением значения прогресс-бара.
   * Функция-наблюдатель должна принимать два параметра: текущее числовое значение прогресса и HTML элемент прогресс-бара.
   *
   * @param {Function} observer - Функция, вызываемая при изменении значения.
   * @param {number} observer.value - Текущее значение прогресса.
   * @param {HTMLElement} observer.htmlElement - HTML элемент прогресс-бара.
   */
  update(observer) {
    this.#observers.push(observer);
  }

  /**
   * Уведомляет наблюдателей об изменении значения.
   * @private
   * @param {number} value - Текущее значение элемента ввода.
   */
  #send(value) {
    for (const observer of this.#observers) {
      observer(isNaN(value) ? 0 : value, this.#inputHtmlElement);
    }
  }

  /**
   * Задает новое значение для элемента ввода и уведомляет наблюдателей.
   * @param {string|number} valueInput - Новое значение для элемента ввода.
   */
  set(valueInput) {
    this.#valueInput = parseFloat(valueInput) || 0;

    this.#inputHtmlElement.value = this.#valueInput.toString();

    this.#send(this.#valueInput);
  }

  /**
   * Возвращает текущее значение элемента ввода.
   * @returns {number} Текущее числовое значение элемента ввода.
   */
  get() {
    return this.#valueInput;
  }
}

export default UIInput;
