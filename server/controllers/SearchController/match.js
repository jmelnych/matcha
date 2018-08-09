const moment   = require('moment');

const deleteDublicates = (users) => {
    let filtered = [];
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
    return filtered;
};

const tagsRating = (tags, they) => {
    if (tags) {
        they.forEach(user => {
            if (user.tag) {
                tags.forEach(tag => {
                    if (user.tag.includes(tag)) {
                        user.match++;
                    }
                });
            }
        });
    }
};

const personalityTable = (my, they) => {
    let chart = {
        'INFP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ENFP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'INFJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ENFJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'INTJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ENTJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'INTP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ENTP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ISFP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ESFP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ISTP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ESTP': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ISFJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ESFJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ISTJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ': 0,
        },
        'ESTJ': {
            'INFP': 0, 'ENFP': 0, 'INFJ': 0, 'ENFJ': 0,
            'INTJ': 0, 'ENTJ': 0, 'INTP': 0, 'ENTP': 0,
            'ISFP': 0, 'ESFP': 0, 'ISTP': 0, 'ESTP': 0,
            'ISFJ': 0, 'ESFJ': 0, 'ISTJ': 0, 'ESTJ'
        }
    };
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
                tagsRating(me.tag, they);

                console.log(they, me);
                res.send('aaa');
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
