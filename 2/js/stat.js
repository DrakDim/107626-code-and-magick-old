'use strict';
window.renderStatistics = function (ctx, names, times) {
  var windowX = 100; // координаты окна статистики по X
  var windowY = 10; // координаты окна статистики по Y
  var windowWidth = 420; // ширина окна статистики
  var windowHeight = 270; // высота окна статистики

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // цвет тени
  ctx.fillRect(windowX + 10, windowY + 10, windowWidth, windowHeight);

  ctx.fillStyle = 'white'; // цвет прямоугольника
  ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
  ctx.strokeRect(windowX, windowY, windowWidth, windowHeight);

  ctx.fillStyle = '#000'; // цвет текста - черный
  ctx.font = '16px PT Mono'; // стиль текста - размер и шрифт
  ctx.fillText('Ура вы победили!', 230, 40); // сообщение и его положение
  ctx.fillText('Список результатов:', 220, 60);

  // цикл поиска худшего значения (незнаю нафиг, но без вычисляемого max гистограмма не строится)
  // ищется наименьший элемент массива times, равный любому значению вплоть до нуля
  // после каждой итерации, продвигается вглубь массива, записывая каждое новое минимальное значение в max
  var max = -1; // max = -1 очко
  var maxIndex = -1; // индекс худшего значения записанного в max
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var histogramHeight = 150; // высота гистаграммы
  var step = histogramHeight / (max - 0); // шаг -выяснить-
  var up;

  // строчка ниже из скопированного из демки кода, использовал для того чтобы разобраться как все работает
  // ctx.fillText('Худшее время: ' + max + ' мс у игрока ' + names[maxIndex], 120, 60);

  // ctx.fillStyle = 'rgba(255, 0, 0, 1)'; - цвет игрока - требуется по заданию
  // ctx.fillStyle = 'rgba(0, 26, 255, random)' - цвет участников - требуется по заданию
  for (var i = 0; i < times.length; i++) {
    up = times[i] * step; // задаю высоту столбика гистаграммы, почему так? Потому что она должна расти вверх
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var color = 'rgba(0, 26, 255, ' + max + ')'; //если что, я так пытаюсь добится рандомной прозрачности
      ctx.fillStyle = color; //и записываю полученную строчку с цветом... прозрачности нету :'(
    }
    ctx.fillRect(150 + 90 * i, 250, 40, -up); // рисуем колоночку, как раз пригодилась переменная чтобы минус поставить
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 150 + 93 * i, 270); // рисуем имя. Вообще, последнее значение должно высчитывать высоту отрисовываемого имени так, чтобы оно было чуть выше каждого столбика, но я не смог :(
    ctx.fillText(Math.round(times[i]), 150 + 93 * i, 90); // выводим округленное количество очков
  }
};
