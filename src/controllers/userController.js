import { reset } from "nodemon";
import User from "../models/User";
import bcrypt from "bcrypt"
import fetch from "node-fetch";
import { render } from "pug";

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
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: error._message,
        });
    }
    return res.redirect("/login");
}
export const getEdit = (req, res) => {
    return res.render("edit-profile");
}
export const postEdit = (req, res) => {
    return res.render("edit-profile");
}
export const remove = (req, res) => {
    res.send("Delete User");
}
export const getLogin = (req, res) => {
    return res.render("login", {
        pageTitle: "login"
    });
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "login";
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username does not exists." })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password."
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}
export const see = (req, res) => {
    res.send("See User Profile!");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id: "5d0cbb9b14d931d5b14c",
        allow_signup: false,
        scope: "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: "5d0cbb9b14d931d5b14c",
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const json = await (await fetch(finalUrl, {
        method: "post",
        headers: {
            Accept: "application/json",
        },
    })).json();
    if ("access_token" in json) {
        const requestUrl = "https://api.github.com";
        const { access_token } = json;
        const userData = await (await fetch(`${requestUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })).json();
        const emailData = await (await fetch(`${requestUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })).json();
        const emailObj = emailData.find(email => email.primary === true && email.verified === true);
        if (!emailObj) {
            return res.redirect("/login");
        } else {
            let user = await User.findOne({ email: emailObj.email });
            if (user) {
                if (!user.socialOnly) {
                    //깃헙으로 회원가입 했던 자가 아님. 로그인 거부.
                    return res.redirect("/");
                }
            } else {
                //새 계정 생성
                try {
                    user = await User.create({
                        avatarUrl: userData.avatar_url,
                        name: userData.name,
                        username: userData.login,
                        location: userData.location,
                        email: emailObj.email,
                        socialOnly: true,
                    });
                } catch (error) {
                    return res.redirect("/");
                }
            }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
    } else {
        return res.redirect("/login")
    }
}