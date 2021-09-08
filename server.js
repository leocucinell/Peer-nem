/*SECTION: external modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/*SECTION: internal modules */
const { auth, event } = require("./controllers");

/*SECTION: instanced modules */
const app = express();

/*SECTION: app configuration */
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");

app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/projectly' }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
    })
);

/*SECTION: middleware */
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
});

const isAuthenticated = function (req, res, next){
    if(req.session.currentUser){
        return next();
    }
    return res.redirect("/");
}

/*SECTION: routes */
app.use("/", auth);
app.use("/main",isAuthenticated, event);

//404 catch-all
app.get("/*", (req, res, next) => {
    res.render("404");
})

/*SECTION: server bind */
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});