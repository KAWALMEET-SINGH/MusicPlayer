const musicContainer = document.querySelector(`musicContainer`);
const prevBtn = document.querySelector(`#prev`);
const playBtn = document.querySelector(`#play`);
const nextBtn = document.querySelector(`#next`);
const reloadBtn = document.querySelector(`#reload`);
const audio = document.querySelector(`#audio`)
const pauseBtn = document.querySelector(`#pause`)
const increaseSpeed = document.querySelector(`#increaseSpeed`)
const decreaseSpeed = document.querySelector(`#decreaseSpeed`)
const progress = document.querySelector(`.progress`)
const progressContainer = document.querySelector(`.progressContainer`)
const title = document.querySelector(`#title`)
const imageContainer = document.querySelector(`.imageContainer`);
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


//Songs
const song = [`testAudio-0`, `testAudio-1`, `testAudio-2`, `testAudio-3`, `testAudio-4`]

let songIndex = 1;

loadSong(song[songIndex]);



let isPlaying = false;
// Functions
function loadSong(song) {
    title.innerText = song;
    audio.src = `sampleAudio/${song}.mp3`
}

function play(audio) {
    isPlaying = true;
    imageContainer.classList.add('rotate')
    pauseBtn.classList.remove('fi-sr-play')
    pauseBtn.classList.add('fi-sr-pause')
    audio.play();
}

function pause(audio) {
    isPlaying = false;
    imageContainer.classList.remove('rotate')
    pauseBtn.classList.add('fi-sr-play')
    pauseBtn.classList.remove('fi-sr-pause')
    audio.pause();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    currTime.innerHTML = min + ':' + sec;

    let min_d = (isNaN(duration) === true) ? '0' :
        Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }


    get_sec_d(duration);
    durTime.innerHTML = min_d + ':' + sec_d;

};

if (isPlaying) {
    console.log(audio.duration);
}

// Event Listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pause(audio) : play(audio);
    // console.log(audio.currentTime);
    // console.log(audio.duration);
});
reloadBtn.addEventListener('click', () => {
    audio.load();
    play(audio);
});
nextBtn.addEventListener('click', () => {
    songIndex++;
    if (songIndex === song.length) {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    play(audio)

});
prevBtn.addEventListener(`click`, () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = (song.length - 1);
    }
    loadSong(song[songIndex]);
    play(audio)
});
increaseSpeed.addEventListener('click', () => {
    switch (audio.playbackRate) {
        case 0.5:
            audio.playbackRate = 0.75;
            console.log(audio.playbackRate);
            break;
        case 0.75:
            audio.playbackRate = 1;
            console.log(audio.playbackRate);
            break;
        case 1.0:
            audio.playbackRate = 1.25;
            console.log(audio.playbackRate);
            break;
        case 1.25:
            audio.playbackRate = 1.5;
            console.log(audio.playbackRate);
            break;
        case 1.5:
            audio.playbackRate = 1.75;
            console.log(audio.playbackRate);
            break;
        case 1.75:
            audio.playbackRate = 2.0;
            console.log(audio.playbackRate);
            break;
        case 2.0:
            audio.playbackRate = 1.0;
            console.log(audio.playbackRate);
            break;
    }
});
decreaseSpeed.addEventListener('click', () => {
    switch (audio.playbackRate) {
        case 2.0:
            audio.playbackRate = 1.75;
            console.log(audio.playbackRate);
            break;
        case 1.75:
            audio.playbackRate = 1.5;
            console.log(audio.playbackRate);
            break;
        case 1.5:
            audio.playbackRate = 1.25;
            console.log(audio.playbackRate);
            break;
        case 1.25:
            audio.playbackRate = 1;
            console.log(audio.playbackRate);
            break;
        case 1.0:
            audio.playbackRate = 0.75;
            console.log(audio.playbackRate);
            break;
        case 0.75:
            audio.playbackRate = 0.5;
            console.log(audio.playbackRate);
            break;
        case 0.5:
            audio.playbackRate = 1;
            console.log(audio.playbackRate);
            break;
    }
});
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    songIndex++;
    if (songIndex === song.length) {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    play(audio)

});

