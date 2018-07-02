module.exports = (req, res) => {
    console.log(req.body);
    const {id} = req.body;
    let user   = req.app.get('user');
    //TODO: save new file name to DB
    res.send('success');
}