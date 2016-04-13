'use strict';

/**
 * @ngdoc function
 * @name learningAngularJsApp.controller:HexmapCtrl
 * @description
 * # HexmapCtrl
 * Controller of the learningAngularJsApp
 */

 // Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
 function HexagonGrid(canvasId, radius) {
     this.radius = radius;

     this.canvas = document.getElementById(canvasId);
     this.context = this.canvas.getContext('2d');

     // All the hexagons, indexed by hexagonal coordinates [u,v]
     this.hexagons = {};

     // All the labels, indexed by hexagonal coordinates [u,v]
     this.labels = {};

     this.canvasOriginX = 0;
     this.canvasOriginY = 0;

     this.stage = new createjs.Stage(canvasId);
     this.stage.enableMouseOver(20);


 }

 // Add or update a text label to the given coordinates
 HexagonGrid.prototype.addLabel = function (u, v, label) {
    // Check if the label already exists, so it doesn't get recreated
    if(!([u,v] in this.labels)){
      var pixel = this.hexToPixel(u,v);
      var text = new createjs.Text(label, '20px Arial', '#ffffff');
      text.x = pixel[0];
      text.y = pixel[1];
      text.textBaseline = 'alphabetic';

      // Add the text label to dictionary
      this.labels[[u,v]] = text;

      // Add the text label to the stage
      this.stage.addChild(text);
    } else {
      this.labels[[u,v]].text = label;
    }

    // Update the stage
    this.stage.update();
  };

 HexagonGrid.prototype.drawHexGrid = function (radius, originX, originY) {
     this.canvasOriginX = originX;
     this.canvasOriginY = originY;

     this.selectedCoord = {u:0, v:0};

     for (var u = -radius; u < radius; u++){
       for (var v = -radius; v < radius; v++){
         var a = {u: u, v: v};
         var b = {u: 0, v: 0};

         if (this.Distance(a,b) > 3){
           continue;
         }

         this.addHex(u, v);
       }
     }
 };

 HexagonGrid.prototype.setHexColor = function(u,v, color){
   if (typeof u !== 'undefined' && typeof v !== 'undefined'){
     if ([u,v] in this.hexagons){
       this.hexagons[[u,v]].graphics._fill.style = color;
       this.stage.update();
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

 HexagonGrid.prototype.addHex = function(u, v) {
     var hexagonGrid = this;
     var pixel = this.hexToPixel(u,v);

     var hexagon = new createjs.Shape();
     hexagon.hexcoord = {u:u, v:v};

     var fillCommand = hexagon.graphics.beginFill('Grey').command;
     hexagon.graphics.beginStroke('black');
     hexagon.graphics.drawPolyStar(pixel[0], pixel[1], this.radius, 6, 0 , 0);

     // Add mouse event
     hexagon.on('click', function(e){
       console.log('clicked on', e.target.hexcoord);
       hexagonGrid.selectedCoord = e.target.hexcoord;
     });
     var originalColor;
     hexagon.on('mouseover', function(e){
       originalColor = fillCommand.style;
       fillCommand.style = 'blue';
       hexagonGrid.stage.update(e);
     });
     hexagon.on('mouseout', function(e){
       fillCommand.style = originalColor;
       this.stage.update(e);
     });

     this.stage.addChild(hexagon);
     this.stage.update();

     this.hexagons[[u,v]] = hexagon;

     return hexagon.graphics;

 };

 HexagonGrid.prototype.Distance = function(a, b){
   return (Math.abs(a.u - b.u) + Math.abs(a.u + a.v - b.u - b.v) + Math.abs(a.v - b.v)) / 2;
 };

angular.module('hexMapApp')
  .controller('HexmapCtrl', function($scope, $http) {
      // Load weapons.json
      $http.get('../data/weapons.json')
        .then(function(res){
          $scope.weapons = res.data;
        });

      var hexagonGrid = new HexagonGrid('HexCanvas', 50);

      $scope.$watch('selectedWeapons', function(newSelectedWeapons, oldSelectedWeapons){
        var n,i;

        if (typeof oldSelectedWeapons !== 'undefined'){
          for (n = 0; n < oldSelectedWeapons.length; n++){
            for (i = 0; i < oldSelectedWeapons[n].arcOfFire.length; i++){
              var ocoord = oldSelectedWeapons[n].arcOfFire[i];
              hexagonGrid.setHexColor(ocoord.u,ocoord.v,'grey');
            }
          }
        }
        if (typeof newSelectedWeapons !== 'undefined'){
          var strengthByCoordinates = {};

          for (n = 0; n < newSelectedWeapons.length; n++){
            for (i = 0; i < newSelectedWeapons[n].arcOfFire.length; i++){
              var ncoord = newSelectedWeapons[n].arcOfFire[i];
              hexagonGrid.setHexColor(ncoord.u,ncoord.v,'red');
              hexagonGrid.addLabel(ncoord.u,ncoord.v,newSelectedWeapons[n].strength);
              if([ncoord.u,ncoord.v] in strengthByCoordinates){
                strengthByCoordinates[[ncoord.u,ncoord.v]] += newSelectedWeapons[n].strength;
              } else {
                strengthByCoordinates[[ncoord.u,ncoord.v]] = newSelectedWeapons[n].strength;
              }
            }
          }
          for (var coordStrength in strengthByCoordinates){
            hexagonGrid.addLabel(coordStrength.split(',')[0],coordStrength.split(',')[1],strengthByCoordinates[coordStrength]);
          }
        }
      }, true);

      hexagonGrid.drawHexGrid(6, 300, 300);
      $scope.hexagonGrid = hexagonGrid;

    });
