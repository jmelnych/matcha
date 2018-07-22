const prepareAge = (age) => {
    if (age && Array.isArray(age) && age.length === 2) {
        let moment = require('moment');
        return [
            moment().subtract(age[1], 'years').format(),
            moment().subtract(age[0], 'years').format()
        ];
    }
    return null;
};

module.exports = (req, res) => {
    let body = req.body;
    if (!body['tag']) {
        body['tag'] = body['tags']
    }
    if (body['gender'] && body['gender'] !== 'male' && body['gender'] !== 'female') {
        delete body['gender'];
    }

    body['bday'] = prepareAge(body['age']);

    let db           = req.app.get('db'),
        prepareQuery = req.app.get('prepareQuery'),
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
        if (query.result.length === 0) {
            error(`No Data\n`);
            process.exit(1);
        }
        query['result'].forEach((value) => {
            if (value['key'] !== '') {
                filters += ' AND ' + value['key'];
                data = data.concat(value['value']);
            }
        });
        let columns = ['id', 'username', 'firstname', 'lastname', 'gender', 'preference',
                'occupancy', 'bday', 'rating', 'bio', 'location', 'avatar', 'added'],
            promise = db.getAllByFilter(columns, filters, data, query['having'], query['order']);
        promise.then((response) => {
            if (response === undefined) {
                res.send('No users');
            } else {
                if (query['order'] === '') {
                }
                console.log(response);
                console.log(query);
                console.log(body);
                res.send(response);
            }
        }).catch(error);
    } catch (e) {
        error(e)
    }
};
