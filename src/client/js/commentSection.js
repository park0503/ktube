const video = document.querySelector("video");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const div = document.createElement("div");
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    div.appendChild(icon);
    div.appendChild(span);
    newComment.appendChild(div);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = video.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text
        })
    });
    textarea.value = "";
    //window.location.reload();
    if (response.status === 201) {
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}