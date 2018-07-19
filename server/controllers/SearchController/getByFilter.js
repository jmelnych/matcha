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
    if (!req.body['tag']) req.body['tag'] = req.body['tags'];

    req.body['bday'] = prepareAge(req.body['age']);

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
        query = prepareQuery(req.body, {
            users: {
                or: {gender: 'array', preference: 'array'},
                between: {bday: 'array', rating: 'array'},
                and: {location: 'string'}
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
                res.send(response);
            }
        }).catch(error);
    } catch (e) {
        error(e)
    }
};
