let audioElement = new Audio('images/LOVE THE WAY TOU LIE/Eminem,_Rihanna_-_Love_The_Way_You_Lie(256k).mp3');
let pausePlay = document.getElementById('pausePlay');
let myProgressBar = document.getElementById('myProgressBar');
let currentTimeDisplay = document.getElementById('currentTime');
let totalDurationDisplay = document.getElementById('timeDisplay');

audioElement.addEventListener('loadedmetadata', () => {
  const duration = Math.floor(audioElement.duration);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = duration % 60;

  const formattedDurationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;

  totalDurationDisplay.textContent = `${durationMinutes}:${formattedDurationSeconds}`;
  
  myProgressBar.value = 0;
});

function updateTime() {
  const currentTime = Math.floor(audioElement.currentTime);
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = currentTime % 60;

  const formattedCurrentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

  currentTimeDisplay.textContent = `${currentMinutes}:${formattedCurrentSeconds}`;

  myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
}

function togglePlayPause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    pausePlay.classList.remove('fa-play-circle');
    pausePlay.classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    pausePlay.classList.remove('fa-pause-circle');
    pausePlay.classList.add('fa-play-circle');
  }
}

pausePlay.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); 
    togglePlayPause();
  }
});

audioElement.addEventListener('timeupdate', updateTime);

myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
  updateTime();
});

audioElement.addEventListener('ended', () => {
  pausePlay.classList.remove('fa-pause-circle');
  pausePlay.classList.add('fa-play-circle');
  myProgressBar.value = 0;
});

updateTime();
