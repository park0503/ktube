const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullscreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
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
    return new Date(Math.floor(seconds * 1000)).toISOString().substring(11, 19);
}

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(video.duration);
    timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(video.currentTime);
    timeLine.value = Math.floor(video.currentTime);
}

const handleTimeLineChange = (e) => {
    const {
        target: {
            value
        }
    } = e;
    video.currentTime = Math.floor(value);
}

const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screent";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screent";
    }

}

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    videoControls.classList.add("showing");

};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(() => {
        videoControls.classList.remove("showing");
    }, 3000);
}


playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
timeLine.addEventListener("input", handleTimeLineChange);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);