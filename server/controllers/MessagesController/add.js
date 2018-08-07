module.exports = (req, res) => {
    console.log('message controller add', req.body);
    res.send('success');
};