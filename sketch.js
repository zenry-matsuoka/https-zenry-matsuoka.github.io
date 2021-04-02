function setup() {
  // mimics the autoplay policy
  getAudioContext().suspend();

  let mySynth = new p5.MonoSynth();

  // This won't play until the context has resumed
  mySynth.play('A6');
}
function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text(getAudioContext().state, width/2, height/2);
}
function mousePressed() {
  userStartAudio();
}

/*
let vid, aud;
let mic, recorder, soundFile;

function setup() {
    getAudioContext().suspend();
    vid = createCapture(VIDEO);
    aud = createCapture(AUDIO);
    mic = new p5.AudioIn();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();

    mic.start();
    vid.hide()
    aud.hide()
}

function record() {

}

function draw() {

}
*/
