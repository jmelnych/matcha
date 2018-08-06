module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }
    let db      = req.app.get('db'),
        promise = db.all(`SELECT history.first_id,
                                 history.second_id,
                                 users.id,
                                 users.firstname,
                                 users.lastname
                          FROM history
                          JOIN users ON (users.id = history.first_id OR
                                         users.id = history.second_id) AND
                                               users.id != ?
                          WHERE 
                          (action = "match")
                          `, [id]);
    promise.then(people => {
        people.map(person => {
            delete person.first_id;
            delete person.second_id;
        });
        res.send(people);
    })
}