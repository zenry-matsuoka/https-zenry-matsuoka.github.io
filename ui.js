let help = document.querySelector(".help");
let help_title = document.querySelector(".help_title");
let help_text = document.querySelector(".help_text");
let help_icon = document.querySelector(".help_icon");
let settings_title = document.querySelector(".settings_title");
let settings = document.querySelector(".settings");
let settings_content = document.querySelector(".settings_content");
// let text = document.querySelector('.text');
//
// text.style.width = '0px';
// text.style.height = '0px';


help.onmouseenter = () => {
  help.style.width = '120px'
  help.style.backgroundPosition = '100% 100%';
  help_title.style.opacity = '100%';
  help_title.style.left = 'calc((100% - 25px) / 2)';
  help.style.cursor = 'pointer';
}

help.onmouseleave = () => {
  help.style.width = '50px'
  help.style.height = '50px'
  help.style.backgroundPosition = '50% 50%';
  settings.style.width = '50px'
  settings.style.height = '50px'
  help_title.style.opacity = '0%';
  help_text.style.opacity = '0%';
  help_title.style.fontSize = '20px';
}

help.onclick = () => {
  help.style.width = '550px';
  help.style.height = '475px'
  help.style.backgroundPosition = '0% 0%';
  help_title.style.left = '50%';
  settings.style.width = '0px';
  settings.style.height = '0px';
  help.style.cursor = 'initial';
  help_text.style.opacity = '100%';
  help_title.style.fontSize = '30px';
  stop_click();
}

settings.onmouseenter = () => {
  settings.style.width = '170px'
  settings.style.backgroundPosition = '100% 100%';
  settings_title.style.opacity = '100%';
  settings_title.style.left = 'calc((100% - 35px) / 2)';
  settings.style.cursor = 'pointer';
  settings_content.hidden = false;
}

settings.onmouseleave = () => {
  document.getElementById("themeDropdown").style.height = '0%';
  document.getElementById("themeDropdownClear").style.height = '0%';
  settings.style.width = '50px'
  settings.style.height = '50px'
  settings.style.backgroundPosition = '50% 50%';
  settings.style.top = '15%';
  help.style.width = '50px';
  help.style.height = '50px';
  settings_title.style.opacity = '0%';
  settings_content.hidden = true;
  settings_content.style.opacity = '0%';
  help_icon.style.width = '7px';
  help_icon.style.height = '36px';
  settings_title.style.fontSize = '20px';
  // text.style.width = '0px';
  // text.style.height = '0px';

}

settings.onclick = () => {
  settings.style.width = '400px';
  settings.style.height = '40%'
  settings.style.backgroundPosition = '0% 0%';
  settings.style.top = '5%';
  settings_title.style.left = '50%';
  settings_content.style.opacity = '0%';
  settings_content.style.transition = 'opacity 2s';
  settings_content.style.opacity = '100%';
  help.style.width = '0px';
  help.style.height = '0px';
  help_icon.style.width = '0px';
  help_icon.style.height = '0px';
  settings.style.cursor = 'initial';
  settings_title.style.fontSize = '30px';
  // text.style.width = 'initial';
  // text.style.height = 'initial';

  stop_click();
}

document.querySelector(".themeOne").onclick = () => {
  document.body.style.backgroundImage = 'url("images/final grid.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}

document.querySelector(".themeTwo").onclick = () => {
  document.body.style.backgroundImage = 'url("images/final grid.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#b8dcf5';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}

document.querySelector(".themeThree").onclick = () => {
  document.body.style.backgroundImage = 'url("images/final grid.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#a8a2a2';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}

document.querySelector(".themeFour").onclick = () => {
  document.body.style.backgroundImage = 'url("images/final grid.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#282C34';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}

document.querySelector(".themeFive").onclick = () => {
  document.body.style.backgroundImage = 'url("images/Themes/Theme 1 Grid.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}
document.querySelector(".themeSix").onclick = () => {
  document.body.style.backgroundImage = 'url("images/Themes/Theme 3.png")';
  document.body.style.backgroundPosition = '10%';
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.backgroundBlendMode = 'multiply';
  document.body.style.transition = 'background-color 1s';
}

document.querySelector('.clear').onclick = () => {
  clear_all_bits();
}

document.querySelector('.landing').addEventListener('transitionend', () => {
  document.querySelector('.landing').hidden = true;
  document.querySelector('.landingBackground').hidden = true;
});

document.querySelector('.dropbtn').onclick = () => {
  document.getElementById("themeDropdown").style.height = '300px';
}
document.querySelector('.dropbtnClear').onclick = () => {
  document.getElementById("themeDropdownClear").style.height = '50px';
}

// document.querySelector('.settings').onmouseleave = () => {
//   document.getElementById("themeDropdown").style.height = '0%';
//   console.log('aaa')
// }

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    console.log('aaaa')
    document.getElementById("themeDropdown").style.height = '0%';
  }
}
