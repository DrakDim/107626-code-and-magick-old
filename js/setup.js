'use strict';

/**
 * Задачи:
 */

/*  1. Покажите блок .setup, убрав в JS-коде у него класс .hidden.
    2. Создайте массив, состоящий из 4 сгенерированных JS объектов,
       которые будут описывать похожих персонажей. Объекты должны содержать следующие поля:
        * name, строка — случайно сгенерированное имя персонажа.
          Имя генерируется из массивов имен и фамилий: нужно случайным образом выбрать из массива имен имя,
          а из массива фамилий фамилию и сложить их.
          При желании имя и фамилию можно в случайном порядке менять местами:

          Имена:   ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']
          Фамилии: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']

        * coatColor, строка — случайный цвет мантии на выбор из следующих:

          ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
           'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']

        * eyesColor, строка — случайный цвет глаз персонажа на выбор из следующих:

          ['black', 'red', 'blue', 'yellow', 'green']
    3. На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template
       создайте DOM-элементы, соответствующие случайно сгенерированным волшебникам и заполните их
       данными из массива:
        * Имя персонажа name запишите как текст в блок .setup-similar-label
        * Цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat
        * Цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes
    4. Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list.
       Для вставки элементов используйте DocumentFragment.
    5. Покажите блок .setup-similar, удалив у него CSS-класс hidden.

    Требования к коду

    Код должен быть разделен на отдельные функции. Стоит отдельно объявить функцию генерации случайных данных,
    функцию создания DOM-элемента на основе JS-объекта, функцию заполнения блока DOM-элементами на основе
    массива JS-объектов. Пункты задания примерно соответствуют функциям, которые вы должны создать.
*/

/**
 * Константы
 */

var WIZZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_SIMILAR_WIZARDS = 4;
/**
 * Промежуточные вычисления
 */

var getRandomInt = function (min, max)	{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var wizardName = function () {
  return WIZZARD_NAMES[getRandomInt(0, WIZZARD_NAMES.length - 1)] + ' ' + WIZZARD_SURNAMES[getRandomInt(0, WIZZARD_SURNAMES.length - 1)];
};

var randomWizards = function () {
  return {name: wizardName(),
    coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)]};
};

var createArrayWiz = function () {
  var targetArray = [];
  for (var i = 0; i < MAX_SIMILAR_WIZARDS; i++) {
    targetArray[i] = randomWizards();
  }
  return targetArray;
};

/**
 * Основная логика
 */

document.querySelector('.overlay').classList.remove('hidden');

var templateWizard = document.querySelector('#similar-wizard-template').content;
var wizardList = document.querySelector('.setup-similar-list');

for (var i = 0; i < MAX_SIMILAR_WIZARDS; i++) {
  var cloneTemplate = templateWizard.cloneNode(true);
  var wizzardContents = createArrayWiz();
  cloneTemplate.querySelector('.setup-similar-label');

  cloneTemplate.querySelector('.setup-similar-label').textContent = wizzardContents[i].name;
  cloneTemplate.querySelector('.wizard-coat').style.fill = wizzardContents[i].coatColor;
  cloneTemplate.querySelector('.wizard-eyes').style.fill = wizzardContents[i].eyesColor;

  wizardList.appendChild(cloneTemplate);
}

document.querySelector('.setup-similar').classList.remove('hidden');
