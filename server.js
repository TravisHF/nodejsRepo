var Express = require('express');
var multer = require('multer');
var url = require('url');

var fs = require('fs');
var app = Express();

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).single("imgUploader"); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res,next) {
    upload(req, res, function (err) {

        var fullUrl = req.protocol + '://' + req.get('host') + "/Images/";

        if (err) {
            return res.end("Something went wrong!");
        }

        res.write(fullUrl+req.file.filename+ " uploaded sucessfully!.");
        return res.end();
    });
});

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});

