import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile;

const handleDownload = async () => {

    const ffmpeg = createFFmpeg({
        corePath: "/assets/ffmpeg-core.js",
        log: true
    });
    await ffmpeg.load(); //js가 아닌 특정 외부 소프트웨어를 사용하는 것이기에 await 필수

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");

    console.log(mp4File);//raw data를 unit8array자료구조 형태로 나타냄
    console.log(mp4File.buffer); //raw binary data를 사용하려면 .buffer가 필수

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    console.log(mp4Blob);

    const mp4Url = URL.createObjectURL(mp4Blob);
    console.log(mp4Url);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "K-Tube_Recording.mp4";
    document.body.appendChild(a); //이렇게 실제 html 문서 상 추가를 하지 않고 다운로드를 하는 것은 브라우저 차원에서 금지함. 보안상 이유인듯.
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
    recorder.ondataavailable = (e) => { //recorder stop시 발생하는 이벤트
        //console.log(e.data); //e.data는 파일
        videoFile = URL.createObjectURL(e.data); //브라우저의 메모리상의 위치를 가르키는 url
        preview.srcObject = null;
        preview.src = videoFile;
        preview.loop = true;
        preview.play();

    };
    recorder.start();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    preview.srcObject = stream; // stream은 Object기에 src가 아닌 srcObject 속성에 넣어줘야 함
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);