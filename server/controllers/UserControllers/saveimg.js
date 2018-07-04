module.exports = (req, res) => {
    if(req.file) {
        let filename = req.file.filename;
        res.send(filename);
    }
};