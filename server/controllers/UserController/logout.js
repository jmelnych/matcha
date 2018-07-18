module.exports = (req, res) => {
    delete req.session.email;
    delete req.session.id;
    res.send('logout');
};
