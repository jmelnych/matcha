const moment = require('moment');

const getOrder = (data) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let key       = Object.keys(data),
            order     = ['rating', 'age', 'radius'],
            direction = ['asc', 'desc'];

        key = key.length === 1 ? key[0] : null;
        if (key && order.includes(key) && direction.includes(data[key])) {
            order = {};
            order[key] = data[key];
            return order;
        }
    }
    return null;
};

const deleteDublicates = (users) => {
    let filtered = {};
    users.forEach(user => {
        if (filtered[user.id] &&
            filtered[user.id].tag && user.tag) {
            filtered[user.id].tag.push(user.tag);
        } else {
            filtered[user.id]          = user;
            filtered[user.id]['match'] = 0;
            filtered[user.id].tag      = filtered[user.id].tag ? [filtered[user.id].tag] : null;
        }
    });
    return Object.values(filtered);
};

const tagsMatch = (tags, they) => {
    if (tags) {
        they.forEach(user => {
            if (user.tag) {
                tags.forEach(tag => {
                    if (user.tag.includes(tag)) {
                        user.match += 5;
                    }
                });
            }
        });
    }
};

const personalityMatch = (personality, they) => {
    if (personality && personality !== '') {
        let chart = {
            'INFP': {
                'INFP': 50, 'ENFP': 50, 'INFJ': 50, 'ENFJ': 100,
                'INTJ': 50, 'ENTJ': 100, 'INTP': 50, 'ENTP': 50,
                'ISFP': -50, 'ESFP': -50, 'ISTP': -50, 'ESTP': -50,
                'ISFJ': -50, 'ESFJ': -50, 'ISTJ': -50, 'ESTJ': -50
            },
            'ENFP': {
                'INFP': 50, 'ENFP': 50, 'INFJ': 100, 'ENFJ': 50,
                'INTJ': 100, 'ENTJ': 50, 'INTP': 50, 'ENTP': 50,
                'ISFP': -50, 'ESFP': -50, 'ISTP': -50, 'ESTP': -50,
                'ISFJ': -50, 'ESFJ': -50, 'ISTJ': -50, 'ESTJ': -50
            },
            'INFJ': {
                'INFP': 50, 'ENFP': 100, 'INFJ': 50, 'ENFJ': 50,
                'INTJ': 50, 'ENTJ': 50, 'INTP': 50, 'ENTP': 100,
                'ISFP': -50, 'ESFP': -50, 'ISTP': -50, 'ESTP': -50,
                'ISFJ': -50, 'ESFJ': -50, 'ISTJ': -50, 'ESTJ': -50
            },
            'ENFJ': {
                'INFP': 100, 'ENFP': 50, 'INFJ': 50, 'ENFJ': 50,
                'INTJ': 50, 'ENTJ': 50, 'INTP': 50, 'ENTP': 50,
                'ISFP': 100, 'ESFP': -50, 'ISTP': -50, 'ESTP': -50,
                'ISFJ': -50, 'ESFJ': -50, 'ISTJ': -50, 'ESTJ': -50
            },
            'INTJ': {
                'INFP': 50, 'ENFP': 100, 'INFJ': 50, 'ENFJ': 50,
                'INTJ': 50, 'ENTJ': 50, 'INTP': 50, 'ENTP': 100,
                'ISFP': 25, 'ESFP': 25, 'ISTP': 25, 'ESTP': 25,
                'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0
            },
            'ENTJ': {
                'INFP': 100, 'ENFP': 50, 'INFJ': 50, 'ENFJ': 50,
                'INTJ': 50, 'ENTJ': 50, 'INTP': 100, 'ENTP': 50,
                'ISFP': 25, 'ESFP': 25, 'ISTP': 25, 'ESTP': 25,
                'ISFJ': 25, 'ESFJ': 25, 'ISTJ': 25, 'ESTJ': 25
            },
            'INTP': {
                'INFP': 50, 'ENFP': 50, 'INFJ': 50, 'ENFJ': 50,
                'INTJ': 50, 'ENTJ': 100, 'INTP': 50, 'ENTP': 50,
                'ISFP': 25, 'ESFP': 25, 'ISTP': 25, 'ESTP': 25,
                'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 100
            },
            'ENTP': {
                'INFP': 50, 'ENFP': 50, 'INFJ': 100, 'ENFJ': 50,
                'INTJ': 100, 'ENTJ': 50, 'INTP': 50, 'ENTP': 50,
                'ISFP': 25, 'ESFP': 25, 'ISTP': 25, 'ESTP': 25,
                'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0
            },
            'ISFP': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': 100,
                'INTJ': 25, 'ENTJ': 25, 'INTP': 25, 'ENTP': 25,
                'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
                'ISFJ': 25, 'ESFJ': 100, 'ISTJ': 25, 'ESTJ': 100
            },
            'ESFP': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 25, 'ENTJ': 25, 'INTP': 25, 'ENTP': 25,
                'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
                'ISFJ': 100, 'ESFJ': 25, 'ISTJ': 100, 'ESTJ': 25
            },
            'ISTP': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 25, 'ENTJ': 25, 'INTP': 25, 'ENTP': 25,
                'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
                'ISFJ': 25, 'ESFJ': 100, 'ISTJ': 25, 'ESTJ': 100
            },
            'ESTP': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 25, 'ENTJ': 25, 'INTP': 25, 'ENTP': 25,
                'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
                'ISFJ': 100, 'ESFJ': 25, 'ISTJ': 100, 'ESTJ': 25
            },
            'ISFJ': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 0, 'ENTJ': 25, 'INTP': 0, 'ENTP': 0,
                'ISFP': 25, 'ESFP': 100, 'ISTP': 25, 'ESTP': 100,
                'ISFJ': 50, 'ESFJ': 50, 'ISTJ': 50, 'ESTJ': 50
            },
            'ESFJ': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 0, 'ENTJ': 25, 'INTP': 0, 'ENTP': 0,
                'ISFP': 100, 'ESFP': 25, 'ISTP': 100, 'ESTP': 25,
                'ISFJ': 50, 'ESFJ': 50, 'ISTJ': 50, 'ESTJ': 50
            },
            'ISTJ': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 0, 'ENTJ': 25, 'INTP': 0, 'ENTP': 0,
                'ISFP': 25, 'ESFP': 100, 'ISTP': 25, 'ESTP': 100,
                'ISFJ': 50, 'ESFJ': 50, 'ISTJ': 50, 'ESTJ': 50
            },
            'ESTJ': {
                'INFP': -50, 'ENFP': -50, 'INFJ': -50, 'ENFJ': -50,
                'INTJ': 0, 'ENTJ': 25, 'INTP': 100, 'ENTP': 0,
                'ISFP': 100, 'ESFP': 25, 'ISTP': 100, 'ESTP': 25,
                'ISFJ': 50, 'ESFJ': 50, 'ISTJ': 50, 'ESTJ': 50
            }
        };
        they.forEach(user => {
            if (user.personality && user.personality !== '') {
                user.match += chart[personality][user.personality];
            }
        });
    }
};

const distanceMatch = (they) => {
    they.forEach(user => {
        user.match -= user.distance;
    });
};

const ageMatch = (age, they) => {
    they.forEach(user => {
        user.match -= Math.abs(age - user.age);
    });
};

const ratingMatch = (they) => {
    they.forEach(user => {
        user.match += user.rating;
    });
};

const matchSorting = (they) => {
    they.sort((current, next) => {
        if (current.match < next.match)
            return 1;
        if (current.match > next.match)
            return -1;
        return 0;
    });
    they.forEach(user => {
        delete user.tag;
        delete user.bday;
        delete user.location;
        delete user.personality;
    });
};

module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }

    let db           = req.app.get('db'),
        prepareUsers = req.app.get('prepareUsers'),
        promise      = db.all(`SELECT users.id,
                                      users.gender,
                                      users.preference,
                                      users.personality,
                                      users.bday,
                                      users.rating,
                                      users.location,
                                      tags.tag
                               FROM users
                                      LEFT JOIN users_tags ON users.id = users_tags.user_id
                                      LEFT JOIN tags ON users_tags.tag_id = tags.id
                               WHERE users.id = ?`, [id]),
        error        = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then((me) => {
        if (me) {
            me         = deleteDublicates(me).pop();
            let gender = me.preference === 'both' ? ['male', 'female'] : [me.preference];
            promise    = db.all(`SELECT
    users.id,
    users.username,
    users.firstname,
    users.lastname,
    users.bday,
    users.location,
    users.avatar,
    users.rating,
    users.online,
    users.personality,
    tags.tag
FROM users
    LEFT JOIN users_tags ON users.id = users_tags.user_id
    LEFT JOIN tags ON users_tags.tag_id = tags.id
WHERE (${gender.map(one => `users.gender = '${one}'`).join(' OR ')})
AND users.id != ? AND users.activation = 1`, [id]);
            promise.then((they) => {
                me.location = JSON.parse(me.location);
                me.age      = moment().diff(me.bday, 'years');
                they        = prepareUsers(deleteDublicates(they), me);
                tagsMatch(me.tag, they);
                personalityMatch(me.personality, they);
                distanceMatch(they);
                ageMatch(me.age, they);
                ratingMatch(they);
                matchSorting(they);

                res.send(they);
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
