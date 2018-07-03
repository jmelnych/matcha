module.exports = (req, res) => {
    //console.log(req.file);
    if(req.file) {
        let filename = req.file.filename;
        res.send(filename);
    }
};