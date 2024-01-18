/**
 * Начальная конфигурация для объекта progressBar, который создается как экземпляр класса ниже
 *
 * @typedef {Object} Config
 * @property {number} startValue - Начальное значение для progress-bar
 * @property {number} endValue - Конечное значение для progress-bar
 * @property {number} speedMs - Продолжительность анимации в мс
 * @property {boolean} startAfterCreated - Запустить progress-bar сразу после создания экзепляра объекта?
 */

/**
 * Класс, который представляет progress-bar
 *
 * @class
 * @classdesc Этот класс можно использовать для создания экземпляра progress-bar
 */
class ProgressBar {
  /**
   * HTML элемент для ввода данных.
   * @private
   * @type {HTMLElement|null}
   */
  #progressBarHtmlElement = null;

  #currentProgress = 0;
  #endValue = null;
  #duration = null;
  #frameRate = 10;
  #timerProgress = null;

  /**
   * Функция-наблюдатель за изменениями значения ввода.
   * @private
   * @type {Function[]}
   */
  #observers = [];

  /**
   * Создает экземпляр класса ProgressBar
   *
   * @constructor
   * @param {string} progressSelector - Селектор html-элемента progress-bar
   * @param {Config} config - Начальная конфигурация объекта progressBar
   */
  constructor(progressSelector, config = {}) {
    this.#progressBarHtmlElement = document.querySelector(progressSelector);

    const {
      startValue = 0,
      endValue = 100,
      speedMs = 5 * 1000,
      startAfterCreated = false,
    } = config;

    if (startValue < 0 || startValue > 100) {
      alert("Начальное значение должно быть от 0 до 100!");
      return;
    }

    if (endValue < 0 || endValue > 100) {
      alert("Начальное значение должно быть от 0 до 100!");
      return;
    }

    this.#currentProgress = startValue;
    this.#endValue = endValue;
    this.#duration = speedMs;

    if (startAfterCreated) {
      this.startProgressBar();
    }
  }

  /**
   * Функция обновления progress-bar
   *
   * @param {number} progress - Число для обработки.
   */
  #updateProgressBar(progress) {
    const angle = progress * 3.6;

    this.#progressBarHtmlElement.style.background = `conic-gradient(rgb(0, 84, 235) ${angle}deg, rgb(239, 243, 246) 0deg)`;
  }

  /**
   * Обновляет экземпляр класса ProgressBar
   *
   * @param {Config} config - Начальная конфигурация объекта progressBar
   */
  updateConfig(config = {}) {
    const {
      startValue = this.#currentProgress,
      endValue = 100,
      speedMs = this.#duration,
      startAfterCreated = false,
    } = config;

    if (startValue < 0 || startValue > 100) {
      alert("Начальное значение должно быть от 0 до 100!");
      return;
    }

    if (endValue < 0 || endValue > 100) {
      alert("Начальное значение должно быть от 0 до 100!");
      return;
    }

    this.#currentProgress = startValue;
    this.#endValue = endValue;
    this.#duration = speedMs;

    if (startAfterCreated) {
      this.startProgressBar();
    }
  }

  startProgressBar() {
    if (this.#timerProgress !== null) {
      clearInterval(this.#timerProgress);
      this.#timerProgress = null;
    }

    const step =
      ((this.#endValue - this.#currentProgress) * this.#frameRate) /
      this.#duration;

    this.#timerProgress = setInterval(() => {
      this.#currentProgress += step;

      if (
        (step > 0 && this.#currentProgress >= this.#endValue) ||
        (step < 0 && this.#currentProgress <= this.#endValue)
      ) {
        this.#currentProgress = this.#endValue; // Убедимся, что не превысим конечное значение

        clearInterval(this.#timerProgress); // Останавливаем интервал
        this.#timerProgress = null;

        for (const observer of this.#observers) {
          observer(this.#currentProgress);
        }
      }

      this.#updateProgressBar(this.#currentProgress);
    }, this.#frameRate);
  }

  update(observer) {
    this.#observers.push(observer);
  }
}

export default ProgressBar;
