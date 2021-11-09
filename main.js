video = ""
statusVar = "";
objects = []
var input = ""

function preload(){
    
}

function setup(){
    canvas = createCanvas(600, 420);
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}
function start(){
    input = document.getElementById("objectName").value;
    objectDetector = ml5.objectDetector("cocosd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(video, 0, 0, 640, 420);

    if(statusVar != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    statusVar = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects = results
}