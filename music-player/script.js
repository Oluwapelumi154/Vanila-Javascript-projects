const img = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progressContainer = document.getElementById('progress')
const progress = document.getElementById('dura')
const currentTimeEl = document.getElementById('currentTime')
const durationEl = document.getElementById('duration')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev-btn')
const playBtn = document.getElementById('play-btn')
const nextBtn = document.getElementById('next-btn')
let isPlaying = false

// songs
const songs = [
  { name: 'jacinto-1', displayName: 'Electric', artist: 'Dele' },
  { name: 'jacinto-2', displayName: 'title', artist: 'pelumi' },
  { name: 'jacinto-3', displayName: 'hot', artist: 'tunde' },
  { name: 'metric-1', displayName: 'hot', artist: 'tunde' },
]
//Current Song
let songIndex = 0

//PrevSong
function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playTrack()
}

//next Song
function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playTrack()
}

// play Track
function playTrack() {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  music.play()
}

// pauseTrack
function pauseTrack() {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  music.pause()
}

playBtn.addEventListener('click', () =>
  isPlaying ? pauseTrack() : playTrack()
)

//Update the DOM
function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  img.src = `img/${song.name}.jpg`
}

// Update Progress Bar and Time
function updateProgressbar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    //Calculate display for Duration
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }
    //Delay Switching Duration to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

    //Calculate display for CurrentTime

    const currentTimeMinutes = Math.floor(currentTime / 60)
    let currentTimeSeconds = Math.floor(currentTime % 60)
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`
    }
    //Delay Switching currentTime to avoid NaN

    if (durationSeconds) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${durationSeconds}`
    }
  }
}

//Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}
loadSong(songs[songIndex])
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressbar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
