const video = document.querySelector("video");
const form = document.getElementById("commentForm");


const handleSubmit = (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = video.dataset.id;
    if (text === "") {
        return;
    }
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text
        })
    });
    textarea.value = "";
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}