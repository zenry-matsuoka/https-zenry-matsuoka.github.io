function bit () {
  this.x = event.pageX - 30;
  this.y = event.pageY - 30;
  this.init_x = 0;
  this.init_y = 0;
  this.new_x = this.x;
  this.new_y = this.y;
  let pageX, pageY;
  let size_small = 250;
  let size_big = 400;
  this.dragging = false;

  this.mode = 0;
  this.has_video = false;
  this.has_audio = false;
  this.small = true;

  this.playback_has_been_setup = false;

  let mediaRecorder;
  let recordedBlobs;

  // setup

  let div = document.createElement('div');
  div.style.zIndex = (bits.length + 1).toString();
  div.className = 'bit';
  div.style.marginLeft = this.x + 'px';
  div.style.marginTop = this.y + 'px';
  document.body.appendChild(div);
  setTimeout(function () {div.style.width = "147px";div.style.height = "55px";},10);

  this.vid_live = document.createElement('video');
  this.vid_live.autoplay = true;
  this.vid_live.muted = true;
  this.vid_live.hidden = true;
  this.vid_live.srcObject = stream;
  div.appendChild(this.vid_live);

  this.vid_playback = document.createElement('video');
  this.vid_playback.hidden = true;
  div.appendChild(this.vid_playback);

  let rec_button = document.createElement('img');
  rec_button.className = 'button';
  rec_button.src = "images\\Icons\\Record X.svg";
  rec_button.style.opacity = 0.5;
  rec_button.style.zIndex = 1;
  div.appendChild(rec_button);

  let aud_button = document.createElement('img');
  aud_button.className = 'small_button';
  aud_button.src = "images\\Icons\\Microphone III.svg"
  aud_button.style.marginLeft = "100px";
  div.appendChild(aud_button);

  let vid_button = document.createElement('img');
  vid_button.className = 'small_button';
  vid_button.src = "images\\Icons\\Camera III.svg"
  vid_button.style.marginLeft = "60px";
  div.appendChild(vid_button);

  let resize_button = document.createElement('img');

  resize_button.src = "images\\Icons\\Expand III.svg";
  resize_button.className = 'small_button';
  resize_button.style.marginLeft = "57px";

  let audio_display;

  // big functions

  this.record_start = () => {
    recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9,opus'};
    mediaRecorder = new MediaRecorder(window.stream, options);
    mediaRecorder.ondataavailable = this.handleDataAvailable;

    setTimeout(function () {mediaRecorder.start()}, 170);
    if (this.has_video) {this.vid_live.hidden = false;}
    else if (this.has_audio) {audio_display.record_start();}
  }

  this.record_stop = () => {
    mediaRecorder.stop();
    this.vid_live.pause();

    if (!this.has_video&&this.has_audio) {audio_display.record_stop();}
  }

  this.play_setup = () => {
    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    console.log(superBuffer);
    this.vid_playback.src = window.URL.createObjectURL(superBuffer);
    this.playback_has_been_setup = true;
  }

  this.play_start = () => {

    rec_button.src = "images\\Icons\\Pause III.svg";

    if (!this.playback_has_been_setup) {this.play_setup();}
    if (this.has_video) {this.vid_playback.hidden = false;this.vid_live.hidden = true;}
    if (!this.has_audio) {this.vid_playback.muted = true;}

    this.vid_playback.play();
  }

  this.vid_playback.onended = () => {

    this.mode = 2;
    this.play_stop();
  }

  this.play_stop = () => {

    rec_button.src = "images\\Icons\\Play III.svg";
    this.vid_playback.pause();
  }

  this.handleDataAvailable = (event) => {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  this.deactivate = () => {
    div.style.width = "0px";

    setTimeout(function () {div.remove();},500);
    this.mode = -1;
  }

  this.reduce_z = () => {
    div.style.zIndex = (parseInt(div.style.zIndex)-1).toString();
  }

  this.drag_start = () => {
    for (var i = 0; i < bits.length; i++) {
      bits[i].reduce_z();
    }
    div.style.zIndex = (bits.length).toString();
    this.init_x = event.pageX;
    this.init_y = event.pageY;

    console.log(this.init_x+","+this.init_y);
    console.log("picked up")
    this.dragging = true;
    stop_click();
    setTimeout(this.drag, 10);
  }

  // event listeners

  div.oncontextmenu = () => {
    this.deactivate();
    stop_click();
    return false;
  }

  div.onmouseenter = () => {
    if (this.mode > 1) {
      rec_button.style.opacity = 1;
      resize_button.style.opacity = 1;
    }
  }

  div.onmouseleave = () => {
    if (this.mode > 1) {
      rec_button.style.opacity = 0;
      resize_button.style.opacity = 0;
    }
  }

  div.onclick = () => {
    stop_click();
  }

  div.onmousedown = () => {
    this.drag_start();
  }

  div.dblclick = () => {
    this.drag_start();
  }

  div.onmouseup = () => {
    if (this.dragging) {
      this.x = this.new_x;
      this.y = this.new_y;
      this.dragging = false;
      stop_click();
      console.log("put down")
    }
  }

  this.drag = () => {
    if (this.dragging) {
      div.style.cursor = "all-scroll";
      this.new_x = this.x + (mouse_x-this.init_x);
      this.new_y = this.y + (mouse_y-this.init_y);
      div.style.marginLeft = this.new_x+"px";
      div.style.marginTop = this.new_y+"px";

      setTimeout(this.drag, 10);
    } else {
      div.style.cursor = "auto";
      return false;
    }
  }

  div.onclick = () => {
    stop_click();
  }

  rec_button.onclick = () => {
    if (!this.has_audio&&!this.has_video) {return false;}
    switch (this.mode) {
      case 0:
        // this means the bit is just created. recording begins
        rec_button.src = "images\\Icons\\Pause II.svg";

        if (this.has_video) {
          div.style.width = size_small+'px';div.style.height = size_small+'px';
          div.appendChild(resize_button);
        } else {
          div.style.width = "147px";div.style.height = "55px";
          audio_display = new p5(p5_audio_display, div);

          let sound_icon = document.createElement('img');
          sound_icon.className = 'small_button';
          sound_icon.style.marginLeft = "10px";
          sound_icon.src = "images\\Icons\\Microphone I.svg";
          div.appendChild(sound_icon);
        }

        vid_button.remove();
        aud_button.remove();

        play_all_bits();
        this.record_start();
        break;
      case 1:
      // recording is done. neutral state
        rec_button.src = "images\\Icons\\Play I.svg";

        stop_all_bits();
        this.record_stop();
        setTimeout(this.play_setup, 100);
        break;
      case 2:
        // playing audio
        this.play_start();
        // console.log(this.vid_playback.duration)
        break;
      case 3:
        // stop audio
        rec_button.src = "images\\Icons\\Play I.svg";
        this.play_stop();
        this.mode = 1;
        break;
    }
    this.mode++;
    stop_click();
  }

  rec_button.onmousedown = () => {
    stop_click();
  }

  aud_button.onclick = () => {
    this.has_audio = !this.has_audio;


    rec_button.style.opacity = 1;
    rec_button.style.cursor = "pointer";

    if (!this.has_audio) {
      aud_button.src = "images\\Icons\\Microphone III.svg";
      if (!this.has_video) {
        rec_button.style.opacity = 0.5;
        rec_button.style.cursor = "auto";
      }
    } else {
      aud_button.src = "images\\Icons\\Microphone I.svg";
    }
    stop_click();
  }

  aud_button.onmousedown = () => {
    stop_click();
  }

  vid_button.onclick = () => {
    this.has_video = !this.has_video;

    rec_button.style.opacity = 1;
    rec_button.style.cursor = "pointer";

    if (!this.has_video) {
      vid_button.src = "images\\Icons\\Camera III.svg";
      if (!this.has_audio) {

        rec_button.style.cursor = "auto";
        rec_button.style.opacity = 0.5;
      }
    } else {
      vid_button.src = "images\\Icons\\Camera I.svg";
    }
    stop_click();
  }

  vid_button.onmousedown = () => {
    stop_click();
  }

  resize_button.onclick = () => {
    this.small = !this.small;
    if (this.small) {
      resize_button.src = "images\\Icons\\Expand III.svg";
      div.style.width = size_small+"px";
      div.style.height = size_small+"px";
      this.vid_live.style.width = size_small+"px";
      this.vid_live.style.height = size_small+"px";
      this.vid_playback.style.width = size_small+"px";
      this.vid_playback.style.height = size_small+"px";
    } else {
      resize_button.src = "images\\Icons\\retract III.svg";
      div.style.width = size_big+"px";
      div.style.height = size_big+"px";
      this.vid_live.style.width = size_big+"px";
      this.vid_live.style.height = size_big+"px";
      this.vid_playback.style.width = size_big+"px";
      this.vid_playback.style.height = size_big+"px";
    }
  }
}
