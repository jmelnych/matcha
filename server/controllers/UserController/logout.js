module.exports = (req, res) => {
    let mysocket =  req.app.get('socket');
    mysocket.logoutDisconnectUser(req.session.id);
    delete req.session.email;
    delete req.session.id;
    delete req.session.location;
    res.send('logout');
};
