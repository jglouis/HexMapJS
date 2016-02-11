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

      this.stage = new createjs.Stage(canvasId);
      this.stage.enableMouseOver(20);
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

          this.drawHex(u, v, '#ddd', '(' + u + ',' + v + ')');
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

  HexagonGrid.prototype.drawHex = function(u, v) {
      var pixel = this.hexToPixel(u,v);

      var hexagon = new createjs.Shape();
      hexagon.hexcoord = {u:u, v:v};

      var fillCommand = hexagon.graphics.beginFill('Grey').command;
      hexagon.graphics.beginStroke('black');
      hexagon.graphics.drawPolyStar(pixel[0], pixel[1], this.width/2, 6, 0 , 0);

      // Add mouse event
      hexagon.on('click', function(e){
        console.log(e.target.hexcoord);
      });
      hexagon.on('mouseover', function(e){
        fillCommand.style = 'blue';
        this.stage.update(e);
      });
      hexagon.on('mouseout', function(e){
        fillCommand.style = 'grey';
        this.stage.update(e);
      });

      this.stage.addChild(hexagon);
      this.stage.update();

      return hexagon.graphics;

  };

  HexagonGrid.prototype.Distance = function(a, b){
    return (Math.abs(a.u - b.u) + Math.abs(a.u + a.v - b.u - b.v) + Math.abs(a.v - b.v)) / 2;
  };
