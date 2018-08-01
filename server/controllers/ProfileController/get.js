const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};

const getColumns = (user, columns) => {
    let arr = user.map((row) => {
        let obj = {};
        Object.keys(columns).forEach(key => row[key] ? obj[columns[key]] = row[key] : null);
        if (Object.keys(obj).length) {
            return obj;
        }
    });
    if (arr[0]) {
        return arr;
    }
};

const filterUser = (user) => {
    let
        info   = {
            id: user[0]['users_id'],
            username: user[0]['users_username'],
            firstname: user[0]['users_firstname'],
            lastname: user[0]['users_lastname'],
            gender: user[0]['users_gender'],
            bday: user[0]['users_bday'],
            added: user[0]['users_added'],
            location: user[0]['users_location'],
            avatar: user[0]['users_avatar'],
            personality: user[0]['users_personality'],
            preference: user[0]['users_preference'],
            occupancy: user[0]['users_occupancy'],
            rating: user[0]['users_rating'],
            bio: user[0]['users_bio']
        },
        photos = getColumns(removeDuplicates(user, 'photos_filename'), {
            photos_filename: 'filename'
        }),
        posts  = getColumns(removeDuplicates(user, 'posts_id'), {
            posts_id: 'id',
            posts_title: 'title',
            posts_post: 'post',
            posts_added: 'added'
        }),
        tags   = getColumns(removeDuplicates(user, 'tags_id'), {
            tags_id: 'id',
            tags_tag: 'tag'
        });
    return {
        info: info,
        photos: photos,
        posts: posts,
        tags: tags
    };
};

module.exports = (req, res) => {
    let first_id  = req.session.id,
        second_id = parseInt(req.body.id);
    if (first_id === undefined) {
        res.send('Need login');
        return;
    }
    if (!second_id || second_id === first_id) {
        res.send('Need User Id');
        return;
    }

    let db                  = req.app.get('db'),
        prepareUsers        = req.app.get('prepareUsers'),
        relationshipHistory = req.app.get('relationshipHistory'),
        promise             = db.getUser(second_id),
        error               = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (response === undefined || !response.length) {
            res.send('No user');
        } else {
            let filtered  = filterUser(response);
            filtered.info = prepareUsers([filtered.info], req.session)[0];
            promise       = db.getHistory(first_id, second_id, true);
            promise.then((history) => {
                let relationship = {
                    'I like': relationshipHistory(history, 'like', first_id),
                    'like Me': relationshipHistory(history, 'like', second_id),
                    'match': relationshipHistory(history, 'match'),
                    'break up': relationshipHistory(history, 'break up'),
                    'I ban': relationshipHistory(history, 'ban', first_id),
                    'ban Me': relationshipHistory(history, 'ban', second_id)
                };
                filtered.relationship = ['I like', 'like Me', 'match', 'break up', 'I ban', 'ban Me']
                    .filter(status => relationship[status]);
                res.send(filtered);
            }).catch(error);
        }
    }).catch(error);
};
