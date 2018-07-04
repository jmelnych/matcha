module.exports = (req, res) => {
    let user   = req.app.get('user'),
        {id}       = req.body,
        {photo} = req.body;
    console.log(photo);
    //TODO: save photo to db
    res.send('Photo saved');

}