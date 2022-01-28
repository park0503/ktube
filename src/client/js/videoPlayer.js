console.log("video player");
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

const handlePlayClick = (e) => {
    //비디오가 재생되고 있다면 멈춤
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    //아니라면 비디오 재생
    playBtn.innerText = video.paused ? "Play" : "Paused"
};

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);