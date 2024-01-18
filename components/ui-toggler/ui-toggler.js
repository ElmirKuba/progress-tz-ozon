/**
 * Класс для создания и управления переключателем (checkbox).
 * Позволяет подписаться на изменения состояния переключателя.
 *
 * @class
 * @classdesc Этот класс представляет собой переключатель, который можно включать и выключать.
 */
class UIToggler {
  /**
   * HTML элемент для checkbox.
   * @private
   * @type {HTMLInputElement|null}
   */
  #toggleHtmlElement = null;

  /**
   * Функции-наблюдатели за изменением состояния переключателя.
   * @private
   * @type {Function[]}
   */
  #observers = [];

  /**
   * Текущее состояние переключателя.
   * @private
   * @type {boolean|null}
   */
  #toggleStatus = null;

  /**
   * Создает экземпляр UIToggler.
   *
   * @constructor
   * @param {string} inputSelector - CSS селектор для выбора элемента переключателя.
   * @param {boolean} toggleStatus - Начальное состояние переключателя.
   */
  constructor(inputSelector, toggleStatus = false) {
    this.#toggleHtmlElement = document.querySelector(inputSelector);

    this.#toggleStatus = toggleStatus;

    this.#toggleHtmlElement.addEventListener("change", () => {
      this.#toggleStatus = this.#toggleHtmlElement.checked;

      this.#send(this.#toggleStatus);
    });
  }

  /**
   * Добавляет функцию-наблюдатель за изменением состояния переключателя.
   * Функция-наблюдатель должна принимать два параметра: текущее состояние и HTML элемент переключателя.
   *
   * @param {Function} observer - Функция, вызываемая при изменении состояния.
   * @param {boolean} observer.value - Текущее состояние переключателя.
   * @param {HTMLElement} observer.htmlElement - HTML элемент переключателя.
   */
  update(observer) {
    this.#observers.push(observer);
  }

  /**
   * Отправляет текущее состояние всем наблюдателям.
   * @private
   * @param {boolean} value - Текущее состояние переключателя.
   */
  #send(value) {
    for (const observer of this.#observers) {
      observer(value, this.#toggleHtmlElement);
    }
  }

  /**
   * Устанавливает состояние переключателя и уведомляет наблюдателей.
   * @param {boolean} toggleStatus - Новое состояние переключателя.
   */
  set(toggleStatus) {
    this.#toggleStatus = toggleStatus;

    this.#toggleHtmlElement.checked = this.#toggleStatus;

    this.#send(this.#toggleStatus);
  }

  /**
   * Возвращает текущее состояние переключателя.
   * @returns {boolean} Текущее состояние переключателя.
   */
  get() {
    return this.#toggleStatus;
  }
}

export default UIToggler;
