const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "K-Tube_Recording.webm";
    document.body.appendChild(a);
    a.click();
    a.remove();
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
    });
    recorder.ondataavailable = (e) => {
        //console.log(e.data); //e.data는 파일
        videoFile = URL.createObjectURL(e.data); //브라우저의 메모리상의 위치를 가르키는 url
        preview.srcObject = null;
        preview.src = videoFile;
        preview.loop = true;
        preview.play();

    };
    console.log(recorder);
    recorder.start();
    console.log(recorder);
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    preview.srcObject = stream;
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);