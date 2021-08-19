import { reset } from "nodemon";
import User from "../models/User";
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
    return res.render("join", {
        pageTitle: "Join"
    });
}
export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { name, email, username, password, passwordConfirmation, location } = req.body;
    if (password !== passwordConfirmation) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        })
    }
    const usernameOrEmailExists = await User.exists({ $or: [{ username }, { email }] });
    if (usernameOrEmailExists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        })
    }
    try {
        await User.create({
            name,
            username,
            password,
            location,
            email
        });
    } catch(error) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: error._message,
        });
    }
    return res.redirect("/login");
}
export const edit = (req, res) => {
    res.send("Edit User");
}
export const remove = (req, res) => {
    res.send("Delete User");
}
export const getLogin = (req, res) => {
    return res.render("login", {
        pageTitle: "login"
    });
}
export const postLogin = async(req, res) => {
    const {username, password} = req.body;
    const pageTitle = "login";
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("login", {pageTitle, errorMessage: "An account with this username does not exists."})
    }
    console.log(password, user.password)
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password."
        })
    }
    req.session.loggedIn = true,
    req.session.user = user;
    return res.redirect("/");
}
export const logout = (req, res) => {
    res.send("Log Out!");
}
export const see = (req, res) => {
    res.send("See User Profile!");
}