import ProgressBar from "../components/progress-bar/progress-bar.js";
import UIInput from "../components/ui-input/ui-input.js";
import UIToggler from "../components/ui-toggler/ui-toggler.js";

// Подписка на событие загрузки для инициализации UI
window.addEventListener("load", main);

/**
 * Главная функция, инициализирующая компоненты UI и настраивающая их взаимодействие.
 */
function main() {
  // Инициализация компонента progress-bar
  const progressBar = new ProgressBar(".progress-bar__circle");

  // Инициализация компонента для ввода числовых значений
  const uiInputValue = new UIInput("#progress-value");

  // Инициализация компонентов переключателей
  const turnOnAnimateMode = new UIToggler("#checkbox-mode");
  const turnHideAnimateMode = new UIToggler("#checkbox-hide");

  //  Обратный вызов для progress-bar
  progressBar.update((value, htmlElement) => {
    // alert(`Прогресс бар завершился со значением "${value}"`);
    // console.log(`Прогресс бар завершился со значением "${value}"`);
  });

  //  Обратный вызов для progress-bar поля ввода
  uiInputValue.update((value, htmlElement) => {
    // Проверка на корректность введенного значения
    if (value < 0 || value > 100) {
      alert(`Введите значение от 0 до 100 (включительно) !`); // Сообщим пользователю о ошибке встроенным способом

      htmlElement.value = ""; // Сброс значения поля ввода
      return;
    }

    // Обновление конфигурации progress-bar и запуск
    progressBar.updateConfig({
      endValue: value,
    });
    progressBar.startProgressBar();
  });

  // Обратный вызов для переключателя анимации
  turnOnAnimateMode.update((value, htmlElement) => {
    // Включение или отключение анимации ProgressBar
    progressBar.turnOnOrOffAnimateRotateBlock(value);
  });

  // Обратный вызов для переключателя видимости
  turnHideAnimateMode.update((value, htmlElement) => {
    // Показ или скрытие ProgressBar
    progressBar.turnShowOrHide();
  });
}
