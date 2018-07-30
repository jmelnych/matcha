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
        info    = {
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
        photos  = getColumns(removeDuplicates(user, 'photos_filename'), {
            photos_filename: 'filename'
        }),
        posts   = getColumns(removeDuplicates(user, 'posts_id'), {
            posts_id: 'id',
            posts_title: 'title',
            posts_post: 'post',
            posts_added: 'added'
        }),
        tags    = getColumns(removeDuplicates(user, 'tags_id'), {
            tags_id: 'id',
            tags_tag: 'tag'
        });
    return {
        info: info,
        photos: photos,
        posts: posts,
        tags: tags,
    };
};

module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }

    let db             = req.app.get('db'),
        prepareUsers   = req.app.get('prepareUsers'),
        prepareHistory = req.app.get('prepareHistory'),
        {id}           = req.body,
        promise        = db.getUser(id),
        error          = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (response === undefined || !response.length) {
            res.send('No user');
        } else {
            let filtered  = filterUser(response);
            filtered.info = prepareUsers([filtered.info], req.session)[0];
            //promise = db.all(`select * from history where
            //    ((first_id = ? and second_id = ?) or (second_id = ? and first_id = ?)) and
            //    (action = ? or action = ? or action = ?)`,
            //    [req.session.id, id, id, req.session.id, 'like', 'ban']);
            //promise.then((history) => {
            //    filtered.history = prepareHistory(history, req.session.id);
                res.send(filtered);
            //}).catch(error);
        }
    }).catch(error);
};
