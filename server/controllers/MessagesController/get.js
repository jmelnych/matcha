module.exports = (req, res) => {
    console.log('message controller get', req.body);
    res.send('success');
};