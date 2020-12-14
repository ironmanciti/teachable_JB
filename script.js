// Classifier Variable
let classifier;
// Model URL
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/87Zpt5W4z/';
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/fN7eaHqzB/';
// Video
let video;
let input;
let flippedVideo;
// To store the classification
let label = "";
//----------------- for Wave of flowing text ---------
let xspacing = 15; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 50.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let sentence = "I Love Coding";
let sentenceArray = [];
let m = 0
//-------------------------------------------
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let cnv = createCanvas(420, 360);
  cnv.parent("canvas");
  // Create the video
  video = createCapture(VIDEO);
  video.size(420, 340);
  video.hide();

  input = createInput();
  input.size(width);
  input.parent("myquestion");

  flippedVideo = ml5.flipImage(video);
  //----------------- for Wave of flowing text ---------
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  if (label == "words") {
    //fill(255);
    //textSize(20);
    //text(input.value(), width / 2 - 30, height / 2);
    sentence = input.value()
    sentenceArray = sentence.split("");
    calcWave();
    renderWave();
  } else if (label == "ok"){
    fill(0, 255, 0);
    textSize(50);
    text("OK!", width / 2 - 10, 50);
  } else if (label == "no"){
    fill(255, 0, 0);
    textSize(50);
    text("NO...", width / 2 - 10, 50);
  } else if (label == "raise"){
    fill(0, 0, 255);
    textSize(20);
    textStyle(BOLD);
    text("I have something to say", 200, 50);
  } 
  
  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

//----------------- for Wave of flowing text ---------
function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = cos(x) * amplitude;
    x += dx;
  }
  if (m > width){
    m = 0;
  } else {
    m += 2;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < sentenceArray.length; x++) {
    //ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    textSize(32);
    textFont('Helvetica');
    fill(random(255), random(100, 255), random(125, 255));
    text(sentenceArray[x],x * xspacing+m, height / 2 + yvalues[x], 32, 32);
  }
}
