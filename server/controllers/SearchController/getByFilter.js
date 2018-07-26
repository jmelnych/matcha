const moment = require('moment');

const prepareAge = (age) => {
    if (age && Array.isArray(age) && age.length === 2) {
        return [
            moment().subtract(age[1], 'years').format(),
            moment().subtract(age[0], 'years').format()
        ];
    }
    return null;
};

const prepareBody = (body) => {
    if (!body.tag) {
        body.tag = body.tags
    }
    if (body.gender && body.gender !== 'male' && body.gender !== 'female') {
        delete body.gender;
    }
    body.bday = prepareAge(body.age);
    return body;
};

module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }

    let db           = req.app.get('db'),
        prepareQuery = req.app.get('prepareQuery'),
        prepareUsers = req.app.get('prepareUsers'),
        body         = prepareBody(req.body),
        error        = (e) => {
            console.log(e);
            res.send(e);
        },
        filters      = '',
        data         = [],
        query;
    try {
        query = prepareQuery(body, {
            users: {
                or: {preference: 'array'},
                between: {bday: 'array', rating: 'array'},
                and: {location: 'string', gender: 'string'}
            },
            tags: {
                in: {tag: 'array'}
            }
        });
        query.result.forEach((value) => {
            if (value.key !== '') {
                filters += ' AND ' + value.key;
                data = data.concat(value.value);
            }
        });
        let columns = ['id', 'username', 'firstname', 'lastname', 'gender', 'preference',
                'occupancy', 'bday', 'rating', 'bio', 'location', 'avatar', 'added'],
            promise = db.getAllByFilter(columns, filters, data, query.having, query.order);
        promise.then((response) => {
            if (response === undefined) {
                res.send('No users');
            } else {
                response = prepareUsers(response, req.session, body.radius);
                if (query.order === '') {
                    response.sort((cur, next) => {
                        if (cur.distance !== next.distance) {
                            if (cur.distance > next.distance) {
                                return body.order.radius === 'asc' ? 1 : -1;
                            } else {
                                return body.order.radius === 'asc' ? -1 : 1;
                            }
                        } else {
                            return 0;
                        }
                    });
                }
                res.send(response);
            }
        }).catch(error);
    } catch (e) {
        error(e)
    }
};
