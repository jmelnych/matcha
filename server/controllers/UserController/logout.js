module.exports = (req, res) => {
    delete req.session.email;
    delete req.session.id;
    delete req.session.location;
    res.send('logout');
};
