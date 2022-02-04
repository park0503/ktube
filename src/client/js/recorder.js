import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const preview = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg"
};

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    //document.body.appendChild(a); //이렇게 실제 html 문서 상 추가를 하지 않고 다운로드를 하는 것은 브라우저 차원에서 금지함. 보안상 이유인듯. ==>> 없어도 되더라. 주석처리
    a.click();
}

const handleDownload = async () => {

    actionBtn.removeEventListener("click", handleDownload);
    actionBtn.innerText = "Transcoding...";
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({
        corePath: "/assets/ffmpeg-core.js",
        log: true
    });
    await ffmpeg.load(); //js가 아닌 특정 외부 소프트웨어를 사용하는 것이기에 await 필수

    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i", files.input, "-r", "60", files.output);

    await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb);//ss로 영상의 특정 시간대로 이동 후 frames:v 1로 스크린샷을 찍고 썸네일을 만들라는 ffmpeg 명령어

    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    //readfile의 output type은 unit8array
    //console.log(mp4File);//raw data를 unit8array자료구조 형태로 나타냄
    //console.log(mp4File.buffer); //raw binary data를 사용하려면 .buffer가 필수


    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
    //console.log(mp4Blob); //raw binary data를 js에서의 blob으로 변환

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);
    //console.log(mp4Url); //변환시킨 blob을 a tag에 삽입을 위해 url로 변환

    downloadFile(mp4Url, "K-Tube_Recording.mp4");
    downloadFile(thumbUrl, "K-Tube_Thumbnail.jpg");

    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
    actionBtn.innerText = "Download Recording";
    actionBtn.removeEventListener("click", handleStop);
    actionBtn.addEventListener("click", handleDownload);

    recorder.stop();
};

const handleStart = () => {
    actionBtn.innerText = "Stop Recording";
    actionBtn.removeEventListener("click", handleStart);
    actionBtn.addEventListener("click", handleStop);

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

actionBtn.addEventListener("click", handleStart);