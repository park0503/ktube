const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handleVideoPlay = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
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
        muteBtnIcon.classList = "fas fa-volume-mute";
    } else if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    volumeValue = value;
    video.volume = value;

};

const formatTime = (seconds) => {
    return new Date(Math.floor(seconds * 1000)).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(video.duration);
    timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(video.currentTime);
    timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (e) => {
    const {
        target: {
            value
        }
    } = e;
    video.currentTime = Math.floor(value);
};

const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }

};

const hideControls = () => {
    videoControls.classList.remove("showing");
}

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 32) {
        handleVideoPlay();
    }
};

const handleVideoEnded = () => {
    const { id } = video.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: 'POST'
    });
};


playBtn.addEventListener("click", handleVideoPlay);
muteBtn.addEventListener("click", handleMute);
timeLine.addEventListener("input", handleTimeLineChange);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handleVideoPlay);
video.addEventListener("ended", handleVideoEnded);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
window.addEventListener("keydown", handleKeyDown);
