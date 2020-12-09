// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/87Zpt5W4z/';

// Video
let video;
let input;
let flippedVideo;
// To store the classification
let label = "";

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
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  if (label == "words") {
    fill(255);
    textSize(20);
    text(input.value(), width / 2 - 30, height / 2);
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