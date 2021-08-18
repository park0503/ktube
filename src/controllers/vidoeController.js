let videos = [
    {
        title: "No1",
        rating: 1,
        comments: 1,
        createdAt: "1 year ago",
        views: 59,
        id: 1
    },
    {
        title: "No2",
        rating: 2,
        comments: 2,
        createdAt: "2 years ago",
        views: 69,
        id: 2
    },
    {
        title: "No3",
        rating: 3,
        comments: 3,
        createdAt: "3 years ago",
        views: 79,
        id: 3
    }
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "HOME", videos });
}
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1]
    return res.render("watch", {
        pageTitle: `Watching ${video.title}`,
        video
    });
}
export const edit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1]
    return res.render("edit", {
        pageTitle: `Editing ${video.title}`,
        video
    });
}

export const update = (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    const video = videos[id - 1]
    res.redirect(`/videos/${id}`)
}

export const search = (req, res) => {
    res.send("Search Videos!");
}
export const remove = (req, res) => {
    res.send("Delete Video!");
}
export const upload = (req, res) => {
    return res.render("upload", {
        pageTitle: "Upload Video"
    });
}
export const create = (req, res) => {
    const { title } = req.body
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        created_at: "just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");
}