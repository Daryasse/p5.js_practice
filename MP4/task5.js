var imgA;
var imgB;

function setup() {
createCanvas(512,512);
background(255);
imgA = createImage(512,512);
imgB = createImage(512,512);
imgA.loadPixels();
imgB.loadPixels();
var d = pixelDensity();
for(var i=0; i<512*512*4*d; i+=4) {
  imgA.pixels[i]=240;
  imgA.pixels[i+1]=250;
  imgA.pixels[i+2]=240;
  imgA.pixels[i+3]=255;
  imgB.pixels[i]=240;
  imgB.pixels[i+1]=240;
  imgB.pixels[i+2]=250;
  imgB.pixels[i+3]=255;
  }
imgA.updatePixels();
imgB.updatePixels();
}

 var operation;

function draw() {
  if (!keyIsDown(32)) {
image(imgA,0,0);
text('Image A',10,20);
  } else {
image(imgB,0,0);
text('Image B',10,20);
  }
}

function makeVector (x, y){
  var vector = [x, y, 1];
  return vector;
}

function drawVector (img, vec){
  var x = vec[0];
  var y = vec[1];
   img.set(x, y, 100);
    img.updatePixels();
}

function mouseDragged(){
  var vec = makeVector(mouseX, mouseY);
  drawVector(imgA, vec);
  switch(operation){
    case "translate":
      drawVector(imgB, transformateMatrixByVector(makeTranslation(document.getElementById('tx').value, 
      document.getElementById('ty').value), vec));
      break;
    case "rotate":
      drawVector(imgB, transformateMatrixByVector(makeRotation(document.getElementById('alpha').value), vec));
      break;
    case "scale":
      drawVector(imgB, transformateMatrixByVector(makeScaling(document.getElementById('sx').value, 
      document.getElementById('sy').value), vec));
      break;
    case "shear":
      drawVector(imgB, transformateMatrixByVector(makeShear(document.getElementById('shx').value, 
      document.getElementById('shy').value), vec));
      break;
    case "unit":
      drawVector(imgB, transformateMatrixByVector(makeIdentity(), vec));
      break;
  }
}

function makeIdentity(){
  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

function makeTranslation(tx, ty){
  return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}

function makeScaling(sx, sy){
  return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
}

function makeRotation(alphaDegrees){
  var alphaRadians = alphaDegrees/180 * Math.PI;
  return [[Math.cos(alphaRadians), -Math.sin(alphaRadians), 0], 
         [Math.sin(alphaRadians), Math.cos(alphaRadians), 0],
         [0, 0, 1]];
}

function makeShear(shx, shy){
  return [[1, shx, 0], [shy, 1, 0], [0, 0, 1]];
}

function transformateMatrixByVector (matrix, vector){
  var result = [0, 0, 0];
  for (var j = 0; j < 3; j++){
    for (var i = 0; i < 3; i++){
      result[j] += matrix[j][i] * vector[i]; 
    }
  }
  return result;
  
}

function multiply (matrix1, matrix2){
  var result = [[0, 0, 0], [0, 0, 0],[0, 0, 0]];
  for (var j = 0; j < 3; j++){
    for (var i = 0; i < 3; i++){
      result[j][i] = matrix1[j][i] * matrix2[j][i]; 
    }
  }
  return result;
}

function cleanCanvas(){
  setup();
}




