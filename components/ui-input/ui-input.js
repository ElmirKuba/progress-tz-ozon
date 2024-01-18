/**
 * Класс для создания пользовательского интерфейсного элемента ввода.
 * Позволяет подписаться на изменения значения ввода.
 *
 * @class
 * @classdesc Этот класс можно использовать для удобной подписки на элемент ввода
 */
class UIInput {
  /**
   * HTML элемент для ввода данных.
   * @private
   * @type {HTMLElement|null}
   */
  #inputHtmlElement = null;

  /**
   * Функция-наблюдатель за изменениями значения ввода.
   * @private
   * @type {Function[]}
   */
  #observers = [];

  /**
   * Создает экземпляр UIInput.
   * @param {string} inputSelector - CSS селектор для выбора элемента ввода.
   */
  constructor(inputSelector) {
    this.#inputHtmlElement = document.querySelector(inputSelector);

    this.#inputHtmlElement.addEventListener("input", () => {
      const value = parseFloat(this.#inputHtmlElement.value);

      if (typeof value !== "number" || isNaN(value)) {
        for (const observer of this.#observers) {
          observer(0);
        }
        return;
      }

      for (const observer of this.#observers) {
        observer(value);
      }
    });
  }

  /**
   * Задает функцию-наблюдатель, которая будет вызываться при изменении значения элемента ввода.
   * @param {Function} observer - Функция, которая будет вызываться при каждом изменении значения.
   *                              Должна принимать один параметр: value (число).
   */
  update(observer) {
    this.#observers.push(observer);
  }
}

export default UIInput;
