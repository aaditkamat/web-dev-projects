const express = require("express");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: "string",
    content: "string"
});

const Article = new mongoose.model("article", articleSchema);

const logger = require("morgan");

const createError = require("http-errors");

const cookieParser = require("cookie-parser");

const app = express();

const port = 3000;

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.route("/articles")
    .get((req, res) => {
        Article.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        });
    })
    .post((req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save()
        .then(() => res.send("Article created successfully"))
        .catch((err) => res.send(err));
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("All articles deleted successfully");
            }
        });
    });

    // catch 404 error and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
  
  // error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
