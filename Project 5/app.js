const express = require("express");

const logger = require("morgan");

const createError = require("http-errors");

const cookieParser = require("cookie-parser");

const app = express();

const appRouter = require("./routes/app");

app.use(cookieParser);
app.use(logger("dev"));
app.use("/", appRouter);

// catch 404 error and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
