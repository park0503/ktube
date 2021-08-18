import { reset } from "nodemon";
import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {
        pageTitle: "Join"
    });
}
export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { name, email, username, password, passwordConfirmation, location } = req.body;
    if (password !== passwordConfirmation) {
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        })
    }
    const usernameOrEmailExists = await User.exists({ $or: [{ username }, { email }] });
    if (usernameOrEmailExists) {
        return res.render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        })
    }
    await User.create({
        name,
        username,
        password,
        location,
        email
    });
    return res.redirect("/login");
}
export const edit = (req, res) => {
    res.send("Edit User");
}
export const remove = (req, res) => {
    res.send("Delete User");
}
export const login = (req, res) => {
    return res.render("login", {
        pageTitle: "login"
    });
}
export const logout = (req, res) => {
    res.send("Log Out!");
}
export const see = (req, res) => {
    res.send("See User Profile!");
}