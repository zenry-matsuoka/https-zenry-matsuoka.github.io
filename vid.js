let bits = [];
let stream;
let mouse_x, mouse_y;
const loop_bar = document.querySelector('.loop_bar');
const loop_play_button = document.createElement('img');
const input = document.querySelector('#title');

loop_play_button.className = 'loop_button';
loop_play_button.src = "images\\Icons\\The Great Loop (Play) II.svg"
// loop_play_button.style.backgroundColor = 'orange';
loop_bar.appendChild(loop_play_button);
loop_playing = false;

loop_play_button.onclick = () => {
  loop_playing = !loop_playing;
  if (loop_playing) {
    loop_play_button.src = "images\\Icons\\The Great Loop (Stop) II.svg";
    play_all_bits();
    // loop_check();
  } else {
    loop_play_button.src = "images\\Icons\\The Great Loop (Play) II.svg";
    stop_all_bits();
  }
  stop_click();
}

function loop_check () {
  if (are_bits_done()) {
    loop_playing = false;
    loop_play_button.src = "images\\Icons\\The Great Loop (Stop) II.svg";
    return true;
  }
  console.log("checking");
  setTimeout(loop_check,100);
}

input.onclick = () => {
  stop_click();
}

input.onchange = () => {
  input.blur();
  stop_click();
}

window.onclick = () => {
  document.querySelector('.landing').style.opacity = '0%';
  document.querySelector('.landingBackground').style.opacity = '0%';
  for (var i = 0; i < bits.length; i++) {
    if (bits[i].mode == 1) {
      return false;
    }
    if (bits[i].mode == 0) {
      bits[i].deactivate();
      return false;
    }
  }
  if (window.stream == undefined) {
    return false;
  }
  bits.push(new bit());
}

window.oncontextmenu = () => {
    return false;
}

window.onload = async () => {
  const constraints = {
    audio: {
      echoCancellation: {exact: false}
    },
    video: {
      width: 200, height: 200
    }
  };

  await init(constraints);
}

window.onmousemove = () => {
  mouse_x = event.pageX;
  mouse_y = event.pageY;
}

async function init(constraints) {
  stream = await navigator.mediaDevices.getUserMedia(constraints);

  window.stream = stream;
};

function stop_click() {
  var evt = window.event;
  if (evt.stopPropagation) {evt.stopPropagation();}
  else {evt.cancelBubble=true;}
}

function play_all_bits () {
  for (var i = 0; i < bits.length; i++) {
    if (bits[i].mode > 1) {
      bits[i].vid_playback.currentTime = 0;
      bits[i].play_start();
    }
  }
}

function stop_all_bits () {
  for (var i = 0; i < bits.length; i++) {
    if (bits[i].mode > 0) {
      bits[i].play_stop();
    }
  }
}

function clear_all_bits () {
  for (var i = 0; i < bits.length; i++) {
    if (bits[i].mode > 0) {
      bits[i].deactivate();
    }
  }
}

function are_bits_done () {
  for (var i = 0; i < bits.legnth; i++) {
    if (!bits[i].vid_playback.paused) {
      return false;
    }
  }
  return true;
}
