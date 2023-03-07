require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const db = require('./db');

function generateToken(username){
	const token = jsonwebtoken.sign({
            username
        },
        process.env.SECRET, {
            expiresIn: '15m'
        }
    );
    const refreshToken = jsonwebtoken.sign({
            username
        },
        process.env.REFRESH
    );

    return {
    	token,
    	refreshToken
    }
}


// GOOGLE AUTHENTICATE
// =================================================

function GoogleSaveToDatabase(profile,cb) {
    profile.status = "success";
    const tokens = generateToken(profile.displayName.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id);
    const courses = new db.CoursesModel({
        courses: []
    });
    const order_history = new db.OrderHistoryModel({
        courses: []
    });
    const user = new db.UserModel({
        name: profile.displayName,
        username: profile.displayName.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        courses: courses._id,
        order_history: order_history._id,
        ref_token: tokens.refreshToken
    });

    const save_courses = async() => {
        return new Promise((res, rej) => {
            courses.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    const save_order_history = async() => {
        return new Promise((res, rej) => {
            order_history.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    const save_user = async() => {
        return new Promise((res, rej) => {
            user.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    db.UserModel.findOne({
        username: profile.displayName.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id
    }, async(err, res) => {
        if (err){
        	profile.status = "failed";
        	cb(null, profile);
        	return;
        };
        profile.tokens = tokens;
        if (!res) {
            await save_courses().catch(d => profile.status = "failed");
            await save_order_history().catch(d => profile.status = "failed");
            await save_user().catch(d => profile.status = "failed");
            cb(null, profile);
        } else {
            await db.UserModel.updateOne({_id: res._id},{
                ref_token: tokens.refreshToken
            })
            cb(null, profile);
        }
    });
}

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:${process.env.AUTH_PORT}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, cb) {
    	GoogleSaveToDatabase(profile,cb);
    }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function isUserLogged(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/auth/google',
    passport.authenticate(
        'google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/user.phonenumbers.read'
            ]
        }));

app.get('/auth/google/callback',
    passport.authenticate(
        'google', {
            session: false,
            failureRedirect: '/login/auth'
        }),
    function(req, res) {
        // Successful authentication, redirect home.
        if(req.user.status === "failed") return res.redirect(`http://127.0.0.1:${process.env.MAIN_PORT}/login`);
        res.redirect(`http://127.0.0.1:${process.env.MAIN_PORT}/profile?token=${req.user.tokens.token}&ref_token=${req.user.tokens.refreshToken}`);
    });


// ===================================================

// GITHUB AUTHENTICATE
// ===================================================

function GithubSaveToDatabase(profile,cb) {
    profile.status = "success";
    const tokens = generateToken(profile.username.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id);
    const courses = new db.CoursesModel({
        courses: []
    });
    const order_history = new db.OrderHistoryModel({
        courses: []
    });
    const user = new db.UserModel({
        name: profile.displayName,
        username: profile.username.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id,
        email: "example@example.com",
        avatar: profile.photos[0].value,
        courses: courses._id,
        order_history: order_history._id,
        ref_token: tokens.refreshToken
    });

    const save_courses = async() => {
        return new Promise((res, rej) => {
            courses.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    const save_order_history = async() => {
        return new Promise((res, rej) => {
            order_history.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    const save_user = async() => {
        return new Promise((res, rej) => {
            user.save(e => {
                if (e) rej(e);
                res(null);
            });
        });
    }

    db.UserModel.findOne({
        username: profile.username.replace(/(\r|\t|\n|\s|\s+)/igm, "") + profile.id
    }, async(err, res) => {
        if (err) profile.status = "failed";
        profile.tokens = tokens;
        if (!res) {
            await save_courses().catch(d => profile.status = "failed");
            await save_order_history().catch(d => profile.status = "failed");
            await save_user().catch(d => profile.status = "failed");
            cb(null, profile);
        } else {
            await db.UserModel.updateOne({_id: res._id},{
                ref_token: tokens.refreshToken
            })
            cb(null, profile);
        }
    });
}

passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:${process.env.AUTH_PORT}/auth/github/callback`
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        // cb(null,profile);
        GithubSaveToDatabase(profile,cb);
    }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.get("/auth/github", passport.authenticate('github', {
    scope: ['repo', 'user']
}));
app.get("/auth/github/callback", passport.authenticate('github', {
    session: false,
    failureRedirect: '/login/auth'
}), function(req, res) {
    // console.log(req.user);
    if(req.user.status === "failed") return res.redirect(`http://127.0.0.1:${process.env.MAIN_PORT}/login`);
    res.redirect(`http://127.0.0.1:${process.env.MAIN_PORT}/profile?token=${req.user.tokens.token}&ref_token=${req.user.tokens.refreshToken}`);
})

// ===================================================

app.get("/", (req, res) => {
    res.send(`Hello`);
});

app.use(express.json());

app.listen(process.env.AUTH_PORT, '0.0.0.0', () => {
    console.log("login and register server is running on port "+process.env.AUTH_PORT);
});