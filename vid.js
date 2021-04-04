let bits = [];
let stream;
let mouse_x, mouse_y;
const loop_bar = document.querySelector('.loop_bar');
const loop_play_button = document.createElement('div');
const input = document.querySelector('input');

loop_play_button.className = 'loop_button';
loop_play_button.style.backgroundColor = 'orange';
loop_bar.appendChild(loop_play_button);
loop_playing = false;

loop_play_button.onclick = () => {
  loop_playing = !loop_playing;
  // if (loop_playing) {
    // loop_play_button.style.borderRadius = "0%";
    play_all_bits();
  // } else {
    // loop_play_button.style.borderRadius = "50%";
    // stop_all_bits();
  // }
  stop_click();
}

input.onclick = () => {
  stop_click();
}

window.onclick = () => {
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
    play_all_bits();
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
    if (bits[i].mode > 0) {
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
