/**
 * Начальная конфигурация для объекта progressBar.
 *
 * @typedef {Object} Config
 * @property {number} startValue - Начальное значение для progress-bar.
 * @property {number} endValue - Конечное значение для progress-bar.
 * @property {number} speedMs - Продолжительность анимации в мс.
 * @property {boolean} startAfterCreated - Запустить progress-bar сразу после создания экзепляра объекта?
 */

/**
 * Класс для создания и управления прогресс-баром.
 *
 * @class
 * @classdesc Этот класс представляет собой прогресс-бар, который можно анимировать и настроить.
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
  #showStatus = "block";

  /**
   * Функции-наблюдатели за изменениями значения ввода.
   * @private
   * @type {Function[]}
   */
  #observers = [];

  /**
   * Создает экземпляр класса ProgressBar.
   *
   * @constructor
   * @param {string} progressSelector - CSS селектор для выбора элемента progress-bar.
   * @param {Config} config - Начальная конфигурация объекта progressBar.
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
   * Обновляет конфигурацию прогресс-бара.
   *
   * @param {Config} config - Новая конфигурация для прогресс-бара.
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

  /**
   * Запускает анимацию прогресс-бара.
   */
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

        this.#send(this.#currentProgress);
      }

      this.#updateProgressBar(this.#currentProgress);
    }, this.#frameRate);
  }

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
   * Отправляет текущее значение прогресса всем наблюдателям.
   * @private
   * @param {number} value - Текущее значение прогресса.
   */
  #send(value) {
    for (const observer of this.#observers) {
      observer(value, this.#progressBarHtmlElement);
    }
  }

  /**
   * Переключает видимость прогресс-бара.
   */
  turnShowOrHide() {
    if (this.#showStatus === "block") this.#showStatus = "none";
    else this.#showStatus = "block";

    this.#progressBarHtmlElement.style.display = this.#showStatus;
  }

  /**
   * Включает или выключает анимацию вращения прогресс-бара.
   *
   * @param {boolean} statusRotate - Указывает, следует ли включить анимацию вращения.
   */
  turnOnOrOffAnimateRotateBlock(statusRotate) {
    if (statusRotate) {
      // this.#progressBarHtmlElement.style.animationName = "animationRotate";
      // this.#progressBarHtmlElement.style.animationDuration = "2s";
      // this.#progressBarHtmlElement.style.animationIterationCount = "infinite";
      // this.#progressBarHtmlElement.style.animationPlayState = "running";

      // Любой из вариантов, по моему мнению, правильный, можно расскоментировать код выше,
      // закоментировав код ниже, по моим правилам, оставить можно только один вариант

      this.#progressBarHtmlElement.classList.remove("stop-animate-rotating");
      this.#progressBarHtmlElement.classList.add("start-animate-rotating");
    } else {
      // this.#progressBarHtmlElement.style.animationPlayState = "paused";

      // точно так же делаем здесь, если мы в первом блоке ветвления расскоментировали код
      // управления анимациями вручную, то мы должны закоментировать методы добавления и
      // удаления классов ниже

      this.#progressBarHtmlElement.classList.add("stop-animate-rotating");
      this.#progressBarHtmlElement.classList.remove("start-animate-rotating");
    }
  }
}

export default ProgressBar;
