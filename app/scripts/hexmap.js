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

     // All vectors, indexed by id (id is unique)
     this.vectorsById = {};

     this.canvasOriginX = 0;
     this.canvasOriginY = 0;

     this.stage = new createjs.Stage(canvasId);
     this.stage.enableMouseOver(20);


 }

// Perform a stage update
 HexagonGrid.prototype.updateStage = function () {
   this.stage.update();
 };

 // Add or update a text label to the given coordinates
 HexagonGrid.prototype.addLabel = function (u, v, label) {
    // Check if the label already exists, so it doesn't get recreated
    if(!([u,v] in this.labels)){
      var pixel = this.hexToPixel(u,v);
      var text = new createjs.Text(label, '60px Arial', '#ffffff');
      text.x = pixel[0] - 15;
      text.y = pixel[1] + 15;
      text.textBaseline = 'alphabetic';

      // Add the text label to dictionary
      this.labels[[u,v]] = text;

      // Add the text label to the stage
      this.stage.addChild(text);

    } else {
      this.labels[[u,v]].text = label;
    }

  };

 // Add a sprite
 HexagonGrid.prototype.addSprite = function (u, v, image){
   var pixel = this.hexToPixel(u,v);

   var bitmap = new createjs.Bitmap(image);
   bitmap.x = pixel[0] - 40;
   bitmap.y = pixel[1] - 40;
   bitmap.scaleX = 0.4;
   bitmap.scaleY = 0.4;
   this.stage.addChild(bitmap);
 };

// Draw an vector arrow
 HexagonGrid.prototype.addVector = function (id, uStart, vStart, uEnd, vEnd, color){
   // If the vector id exists, remove the graphics
   if(id in this.vectorsById){
     this.stage.removeChild(this.vectorsById[id].arrow);
     this.stage.removeChild(this.vectorsById[id].arrowCap);
   }

   var pixelStart = this.hexToPixel(uStart, vStart);
   var pixelEnd = this.hexToPixel(uEnd, vEnd);

   var arrow = new createjs.Shape();
   arrow.graphics.s(color).setStrokeStyle(10).mt(pixelStart[0], pixelStart[1]).lt(pixelEnd[0], pixelEnd[1]);

   // Arrow cap
   var arrowCap = new createjs.Shape();
   arrowCap.graphics.s(color).setStrokeStyle(10).mt(-15, +15).lt(0, 0).lt(-15, -15);

   var dx = pixelEnd[0] - pixelStart[0];
   var dy = pixelEnd[1] - pixelStart[1];
   var radian = Math.atan2(dy, dx) -  Math.atan2(0, 1);
   var degree = radian / Math.PI * 180;
   arrowCap.x = pixelEnd[0];
   arrowCap.y = pixelEnd[1];
   arrowCap.rotation = degree;

   this.stage.addChild(arrow);
   this.stage.addChild(arrowCap);

   this.vectorsById[id] = {arrow: arrow, arrowCap: arrowCap};
 };

 HexagonGrid.prototype.drawHexGrid = function (radius, originX, originY) {
     this.canvasOriginX = originX;
     this.canvasOriginY = originY;

     this.selectedCoord = {u:0, v:0};

     for (var u = -radius; u <= radius; u++){
       for (var v = -radius; v <= radius; v++){
         var a = {u: u, v: v};
         var b = {u: 0, v: 0};

         if (this.Distance(a,b) > radius){
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
     }
   }
 };

 HexagonGrid.prototype.setAllHexColor = function(color){
     for (var key in this.hexagons){
       this.hexagons[key].graphics._fill.style = color;
   }
 };

 HexagonGrid.prototype.hexToPixel = function(u,v){
   var y = this.radius * Math.sqrt(3) * (v + u/2);
   var x = this.radius * 3/2 * u;

   x += this.canvasOriginX;
   y += this.canvasOriginY;

   return [x, y];
 };

 HexagonGrid.prototype.pixelToHex = function(x, y){
   x -= this.canvasOriginX;
   y -= this.canvasOriginY;

   var q = Math.round(x * 2/3 / this.radius);
   var r = Math.round((-x / 3 + Math.sqrt(3)/3 * y) / this.radius);

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
     hexagon.on('mouseover', function(){
       originalColor = fillCommand.style;
       fillCommand.style = 'blue';
       this.stage.update();
     });
     hexagon.on('mouseout', function(){
       fillCommand.style = originalColor;
       this.stage.update();
     });

     this.stage.addChild(hexagon);
     this.hexagons[[u,v]] = hexagon;

     return hexagon.graphics;

 };

 HexagonGrid.prototype.Distance = function(a, b){
   return (Math.abs(a.u - b.u) + Math.abs(a.u + a.v - b.u - b.v) + Math.abs(a.v - b.v)) / 2;
 };
