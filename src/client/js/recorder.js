const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    preview.srcObject = stream;
    preview.play();
};

startBtn.addEventListener("click", handleStart);