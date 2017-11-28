'use strict';
window.renderStatistics = function (ctx, names, times) {

  var INITIAL_WINDOW_STATICTICS_X = 100;
  var INITIAL_WINDOW_STATICTICS_Y = 10;

  var OFFSET_SHADOW_WINDOW_STATISTIC_X = 10;
  var OFFSET_SHADOW_WINDOW_STATISTIC_Y = 10;

  var INITIAL_COLUM_Y = 250;

  var WIN_PLAYER_NAME_X = 150;

  var WINDOW_STATICTICS_WIDTH = 420;
  var WINDOW_STATICTICS_HEIGHT = 270;

  var HISTOGRAM_WINDOW_HEIGHT = 150;
  var HISTOGRAM_COLUMN_WIDTH = 40;

  var WINDOW_STATICTICS_COLOR = 'white';
  var SHADOW_WINDOW_STATISTIC_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CONGRATULATION_TEXT_COLOR = '#000';
  var TEXT_SIZE = '16px';
  var TEXT_FONT = 'PT Mono';
  var WIN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var OTHER_PLAYER_COLOR = 'rgba(0, 26, 255, 1)';

  var windowRect = function (windowX, windowY, offsetShadowX, offsetShadowY, width, height, color, colorShadow) {
    ctx.fillstyle = colorShadow;
    ctx.fillRect(windowX + offsetShadowX, windowY + offsetShadowY, width, height);

    ctx.fillstyle = color;
    ctx.fillRect(windowX, windowY, width, height);
    ctx.strokeRect(windowX, windowY, width, height);
  };

  var textRect = function (text, x, y, size, font, color) {
    ctx.fillstyle = color;
    ctx.font = size + ' ' + font;
    ctx.fillText(text, x, y);

  };

  var maxValueSerch = function (arrayTimes) {
    var maxValue = -1;
    for (var i = 0; i < arrayTimes.length; i++) {
      var minValue = arrayTimes[i];
      if (minValue > maxValue) {
        maxValue = minValue;
      }
    }
    return Math.round(maxValue);
  };

  var drawColum = function (x, y, width, heigth, color) {
    ctx.fillstyle = color;
    ctx.fillRect(x, y, width, heigth);
  };

  var drawHistogram = function (arrayTimes, arrayNames) {
    var step = HISTOGRAM_WINDOW_HEIGHT / (maxValueSerch(arrayTimes) - 0);
    for (var i = 0; i < arrayTimes.length; i++) {
      var up = arrayTimes[i] * step;
      if (arrayNames[i] === 'Вы') {
        textRect(arrayNames[i], WIN_PLAYER_NAME_X + 93 * i, INITIAL_COLUM_Y + 20, TEXT_SIZE, TEXT_FONT, WIN_PLAYER_COLOR);
        drawColum(150 + 90 * i, 250, 40, -up, WIN_PLAYER_COLOR);
        textRect(arrayTimes[i], WIN_PLAYER_NAME_X + 93 * i, 90, TEXT_SIZE, TEXT_FONT, WIN_PLAYER_COLOR);
      } else {
        textRect(arrayNames[i], WIN_PLAYER_NAME_X + 93 * i, INITIAL_COLUM_Y + 20, TEXT_SIZE, TEXT_FONT, OTHER_PLAYER_COLOR);
        drawColum(150 + 90 * i, 250, 40, -up, OTHER_PLAYER_COLOR);
        textRect(arrayTimes[i], WIN_PLAYER_NAME_X + 93 * i, 90, TEXT_SIZE, TEXT_FONT, OTHER_PLAYER_COLOR);
      }
    }
  };

  windowRect(INITIAL_WINDOW_STATICTICS_X,
      INITIAL_WINDOW_STATICTICS_Y,
      OFFSET_SHADOW_WINDOW_STATISTIC_X,
      OFFSET_SHADOW_WINDOW_STATISTIC_Y,
      WINDOW_STATICTICS_WIDTH,
      WINDOW_STATICTICS_HEIGHT,
      WINDOW_STATICTICS_COLOR,
      SHADOW_WINDOW_STATISTIC_COLOR);

  textRect('Ура вы победили!', 230, 40, TEXT_SIZE, TEXT_FONT, CONGRATULATION_TEXT_COLOR);
  textRect('Список результатов:', 220, 60, TEXT_SIZE, TEXT_FONT, CONGRATULATION_TEXT_COLOR);

  drawHistogram(times, names);
};
