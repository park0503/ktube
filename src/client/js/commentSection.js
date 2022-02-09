const video = document.querySelector("video");
const form = document.getElementById("commentForm");
const delBtns = document.querySelectorAll(".delBtn");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
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
    //window.location.reload();
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

const handleDel = async (e) => {
    e.preventDefault();
    const { id } = e.target.parentNode.dataset;
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE"
    });
    if (response.status === 200) {
        videoComments.removeChild(e.target.parentNode);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}
if (delBtns) {
    delBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", handleDel);
    })
}