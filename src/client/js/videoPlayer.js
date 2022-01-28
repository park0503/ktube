console.log("video player");
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (e) => {
    //비디오가 재생되고 있다면 멈춤
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    //아니라면 비디오 재생
};

const handleMute = (e) => {

};

const handlePause = () => {
    playBtn.innerText = "Play"
}

const handlePlay = () => {
    playBtn.innerText = "Pause"
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
