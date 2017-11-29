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

  var createRect = function (х, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(х, y, width, height);
  };

  var createText = function (text, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.font = size + ' ' + TEXT_FONT;
    ctx.fillText(text, x, y);

  };

  var searchMaxValue = function (arrayTimes) {
    var maxValue = -1;
    for (var i = 0; i < arrayTimes.length; i++) {
      var minValue = arrayTimes[i];
      if (minValue > maxValue) {
        maxValue = minValue;
      }
    }
    return Math.round(maxValue);
  };

  var drawColumn = function (x, y, width, heigth, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, heigth);
  };

  var drawHistogram = function (arrayTimes, arrayNames) {
    var step = HISTOGRAM_WINDOW_HEIGHT / (searchMaxValue(arrayTimes) - 0);
    for (var i = 0; i < arrayTimes.length; i++) {
      var up = arrayTimes[i] * step;
      if (arrayNames[i] === 'Вы') {
        createText(arrayNames[i], WIN_PLAYER_NAME_X + 93 * i, INITIAL_COLUM_Y + 20, TEXT_SIZE, WIN_PLAYER_COLOR);
        drawColumn(150 + 90 * i, 250, HISTOGRAM_COLUMN_WIDTH, -up, WIN_PLAYER_COLOR);
        createText(arrayTimes[i], WIN_PLAYER_NAME_X + 93 * i, 90, TEXT_SIZE, TEXT_FONT, WIN_PLAYER_COLOR);
      } else {
        createText(arrayNames[i], WIN_PLAYER_NAME_X + 93 * i, INITIAL_COLUM_Y + 20, TEXT_SIZE, OTHER_PLAYER_COLOR);
        drawColumn(150 + 90 * i, 250, HISTOGRAM_COLUMN_WIDTH, -up, OTHER_PLAYER_COLOR);
        createText(arrayTimes[i], WIN_PLAYER_NAME_X + 93 * i, 90, TEXT_SIZE, TEXT_FONT, OTHER_PLAYER_COLOR);
      }
    }
  };

  var shadowX = INITIAL_WINDOW_STATICTICS_X + OFFSET_SHADOW_WINDOW_STATISTIC_X;
  var shadowY = INITIAL_WINDOW_STATICTICS_Y + OFFSET_SHADOW_WINDOW_STATISTIC_Y;
  createRect(shadowX, shadowY, WINDOW_STATICTICS_WIDTH, WINDOW_STATICTICS_HEIGHT, SHADOW_WINDOW_STATISTIC_COLOR);
  createRect(INITIAL_WINDOW_STATICTICS_X, INITIAL_WINDOW_STATICTICS_Y, WINDOW_STATICTICS_WIDTH, WINDOW_STATICTICS_HEIGHT, WINDOW_STATICTICS_COLOR);

  createText('Ура вы победили!', 230, 40, TEXT_SIZE, CONGRATULATION_TEXT_COLOR);
  createText('Список результатов:', 220, 60, TEXT_SIZE, CONGRATULATION_TEXT_COLOR);

  drawHistogram(times, names);
};
