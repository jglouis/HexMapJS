'use strict';

/**
 * @ngdoc function
 * @name learningAngularJsApp.controller:HexmapCtrl
 * @description
 * # HexmapCtrl
 * Controller of the learningAngularJsApp
 */
angular.module('hexMapApp')
  .controller('HexmapCtrl', function () {
  });

  // Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
  function HexagonGrid(canvasId, radius) {
      this.radius = radius;

      this.height = Math.sqrt(3) * radius;
      this.width = 2 * radius;
      this.side = (3 / 2) * radius;

      this.canvas = document.getElementById(canvasId);
      this.context = this.canvas.getContext('2d');

      this.canvasOriginX = 0;
      this.canvasOriginY = 0;

      this.canvas.addEventListener('mousedown', this.clickEvent.bind(this), false);
  }

  HexagonGrid.prototype.drawHexGrid = function (radius, originX, originY) {
      this.canvasOriginX = originX;
      this.canvasOriginY = originY;

      for (var u = -radius; u < radius; u++){
        for (var v = -radius; v < radius; v++){
          var a = {u: u, v: v};
          var b = {u: 0, v: 0};

          if (this.Distance(a,b) > 3){
            continue;
          }
          var pixel = this.hexToPixel(u,v);
          this.drawHex(pixel[0], pixel[1], '#ddd', '(' + u + ',' + v + ')');
        }
      }
  };

  HexagonGrid.prototype.hexToPixel = function(u,v){
    var y = this.radius * Math.sqrt(3) * (u + v/2);
    var x = this.radius * 3/2 * v;

    x += this.canvasOriginX;
    y += this.canvasOriginY;

    return [x, y];
  };

  HexagonGrid.prototype.pixelToHex = function(x, y){
    x -= this.canvasOriginX;
    y -= this.canvasOriginY;

    var r = Math.round(x * 2/3 / this.radius);
    var q = Math.round((-x / 3 + Math.sqrt(3)/3 * y) / this.radius);

    return [q, r];
  };

  HexagonGrid.prototype.drawHex = function(x0, y0, fillColor, debugText) {
      this.context.strokeStyle = '#000';
      this.context.beginPath();
      this.context.moveTo(x0 + this.width - this.side, y0);
      this.context.lineTo(x0 + this.side, y0);
      this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
      this.context.lineTo(x0 + this.side, y0 + this.height);
      this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
      this.context.lineTo(x0, y0 + (this.height / 2));

      if (fillColor) {
          this.context.fillStyle = fillColor;
          this.context.fill();
      }

      this.context.closePath();
      this.context.stroke();

      if (debugText) {
          this.context.font = '8px';
          this.context.fillStyle = '#000';
          this.context.fillText(debugText, x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
      }
  };

  //Recusivly step up to the body to calculate canvas offset.
  HexagonGrid.prototype.getRelativeCanvasOffset = function() {
  	var x = 0, y = 0;
  	var layoutElement = this.canvas;
      if (layoutElement.offsetParent) {
          do {
              x += layoutElement.offsetLeft;
              y += layoutElement.offsetTop;
          } while (layoutElement === layoutElement.offsetParent);

          return { x: x, y: y };
      }
  };

  HexagonGrid.prototype.clickEvent = function (e) {
      var mouseX = e.pageX - this.canvas.offsetLeft - Math.floor(this.width/2);
      var mouseY = e.pageY - this.canvas.offsetTop - this.height/2;

      var localX = mouseX - this.canvasOriginX;
      var localY = mouseY - this.canvasOriginY;

      console.log({x: localX, y: localY});
      var hex = this.pixelToHex(mouseX, mouseY);
      console.log({u:hex[0], v:hex[1]});

      var pixel = this.hexToPixel(hex[0],hex[1]);

      this.drawHex(pixel[0], pixel[1], 'rgba(110,110,70,0.3)', '');
  };

  HexagonGrid.prototype.Distance = function(a, b){
    return (Math.abs(a.u - b.u) + Math.abs(a.u + a.v - b.u - b.v) + Math.abs(a.v - b.v)) / 2;
  };
