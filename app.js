const express = require('express')
const app = express()
const port = 3000
const urlFolder = 'c:/uploads'
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: urlFolder

});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, nombreArchivo");

    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api/upload', multipartMiddleware, (req, res) => {
    var fileName = urlFolder + "/" + req.files.uploads[0].name;
    var tmpFile = req.files.uploads[0].path;
    console.log(req.body, tmpFile);
    var fs = require('fs');
    fs.rename(tmpFile, fileName, function (err) {
        if (err) throw err;
        console.log('File Renamed.');
    });
    res.json({

        'message': 'File uploaded succesfully '
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))