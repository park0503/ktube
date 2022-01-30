console.log("video player");
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");


let volumeValue = 0.5;
video.volume = volumeValue;

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
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (e) => {
    const {
        target: {
            value
        }
    } = e;
    console.log(value);
    if (value === "0") {
        video.muted = true;
        muteBtn.innerText = "Unmute";
    } else if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;

};

const formatTime = (seconds) => {
    console.log(seconds);
    return new Date(Math.floor(seconds * 1000)).toISOString().substring(11, 19);
}

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(video.currentTime);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);