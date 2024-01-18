import ProgressBar from "../components/progress-bar/progress-bar.js";
import UIInput from "../components/ui-input/ui-input.js";

// Вызов главной функции после полной загрузки страницы
window.addEventListener("load", main);

/**
 * Главная функция, инициализирующая компоненты UI и настраивающая их взаимодействие.
 */
function main() {
  // Инициализация прогресс-бара с указанным селектором
  const progressBar = new ProgressBar(".progress-bar__circle");

  // Инициализация пользовательского ввода с указанным селектором
  const uiInput = new UIInput("#progress-value");

  // Установка обработчика завершения для progressBar
  progressBar.update((value) => {
    alert(`Прогресс бар завершился со значением "${value}"`);
  });

  // Установка обработчика изменения для uiInput
  uiInput.update((value) => {
    // Обновление конфигурации progressBar и перезапуск
    progressBar.updateConfig({
      endValue: value,
    });
    progressBar.startProgressBar();
  });
}
