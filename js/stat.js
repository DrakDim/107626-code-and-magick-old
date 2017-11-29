'use strict';
window.renderStatistics = function (ctx, names, times) {

  var INITIAL_STATICTICS_X = 100;
  var INITIAL_STATICTICS_Y = 10;

  var OFFSET_SHADOW_STATISTIC_X = 10;
  var OFFSET_SHADOW_STATISTIC_Y = 10;

  var SHADOW_X = INITIAL_STATICTICS_X + OFFSET_SHADOW_STATISTIC_X;
  var SHADOW_Y = INITIAL_STATICTICS_Y + OFFSET_SHADOW_STATISTIC_Y;

  var INITIAL_COLUMN_Y = 250;
  var INITIAL_COLUMN_X = 150;

  var STATICTICS_WIDTH = 420;
  var STATICTICS_HEIGHT = 270;

  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_COLUMN_WIDTH = 40;
  var DISTANCE_BETWEEN_COLUMNS = 50;

  var STATICTICS_COLOR = 'white';
  var SHADOW_STATISTIC_COLOR = 'rgba(0, 0, 0, 0.7)';
  var DEFAULT_TEXT_COLOR = '#000';
  var FONT = '16px PT Mono';
  var WIN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

  var createRect = function (х, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(х, y, width, height);
  };

  var createText = function (text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = FONT;
    ctx.fillText(text, x, y);
  };

  var searchMaxValue = function (arrayTimes) {
    var maxValue = -1;
    var minValue = -1;
    for (var i = 0; i < arrayTimes.length; i++) {
      minValue = arrayTimes[i];
      if (minValue > maxValue) {
        maxValue = minValue;
      }
    }
    return maxValue;
  };

  var drawColumn = function (x, y, width, heigth, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, heigth);
    ctx.strokeRect(x, y, width, heigth);
  };

  var randomAlpha = function () {
    return Math.random() === 0 ? 0.01 : Math.random().toFixed(2);
  };

  var drawHistogram = function (arrayTimes, arrayNames) {
    var columnHeight;
    var columnTextHeight;
    var playerColumnColor;
    var ColumnX;
    for (var i = 0; i < arrayTimes.length; i++) {
      columnHeight = arrayTimes[i] * HISTOGRAM_HEIGHT / (searchMaxValue(arrayTimes) - 0);
      columnTextHeight = STATICTICS_HEIGHT - (columnHeight + 30);
      playerColumnColor = arrayNames[i] === 'Вы' ? WIN_PLAYER_COLOR : 'rgba(0, 26, 255, ' + randomAlpha() + ')';
      ColumnX = INITIAL_COLUMN_X + i * (DISTANCE_BETWEEN_COLUMNS + HISTOGRAM_COLUMN_WIDTH);

      drawColumn(ColumnX, INITIAL_COLUMN_Y, HISTOGRAM_COLUMN_WIDTH, -columnHeight, playerColumnColor);

      createText(arrayNames[i], ColumnX, INITIAL_COLUMN_Y + 20, DEFAULT_TEXT_COLOR);
      createText(Math.round(arrayTimes[i]), ColumnX, columnTextHeight, DEFAULT_TEXT_COLOR);
    }
  };

  createRect(SHADOW_X, SHADOW_Y, STATICTICS_WIDTH, STATICTICS_HEIGHT, SHADOW_STATISTIC_COLOR);
  createRect(INITIAL_STATICTICS_X, INITIAL_STATICTICS_Y, STATICTICS_WIDTH, STATICTICS_HEIGHT, STATICTICS_COLOR);

  createText('Ура вы победили!', 230, 40, DEFAULT_TEXT_COLOR);
  createText('Список результатов:', 220, 60, DEFAULT_TEXT_COLOR);

  drawHistogram(times, names);
};
