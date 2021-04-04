const p5_audio_display = (sketch) => {
  let mic, recorder, soundFile;
  let waves = [];
  let recording = false;

  sketch.setup = () => {
    createCanvas(1,1);
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    console.log("setup running");
    soundFile = new p5.SoundFile();
    soundFile.playMode('restart');
    sketch.createCanvas(1,1);
  }

  sketch.record_start = () => {
    recording = true;
    if (mic.enabled) {
        print("recording started");
        setTimeout(function () {recorder.record(soundFile)}, 140);
    }
    let canvas = sketch.createCanvas(150,35);
    canvas.style.display = "inline-block";
    canvas.style.marginLeft = "40px";
  }

  sketch.record_stop = () => {
    recording = false;
    print("recording stopped");
    recorder.stop();
  }

  sketch.liveRolling = (mic, audioWidth, audioHeight, audioX, audioY, wave) => {
    let level = mic.getLevel();
    let scale = 10;
    let length = audioWidth / 10;
    let sampleSize = wave.length / length;
    let averageWaves = [length];

    sketch.rectMode(CENTER);
    sketch.noStroke()
    sketch.fill(0)
    for (let i = 0; i < length; i++) {
      let av = 0;
      for (let j = -sampleSize; j < sampleSize; j++) {
        if (wave[round(i*sampleSize+j)] > 0) {
          av += wave[round(i*sampleSize+j)];
        }
      }
      averageWaves[i] = av/(sampleSize*2);
    }
    for (let i = 0; i < averageWaves.length; i++) {
      let h = abs(map(averageWaves[i] + averageWaves[i - 1] / 3 + averageWaves[i + 1] / 3, 0, 0.5+max(averageWaves)/4, 0, audioHeight, true));
      sketch.rect(i * scale + audioX, audioY, scale / 2, (abs(h - 10) + h - 10) / 2 + scale / 2);
    }
    return level
  }

  sketch.stop = () => {
    print("playback stopped");
    soundFile.stop();
  }

  sketch.draw = () => {
    if (recording) {
      sketch.clear();
      waves.push(sketch.liveRolling(mic, 100, 100, 40, 35/2, waves));
    }
  }
}
