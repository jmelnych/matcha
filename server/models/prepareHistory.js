module.exports = (history, id) => {
    if (history) {
        let result = history.map(row => ((row.first_id === id ? 'I ' : '') +
            row.action + (row.second_id === id ? ' Me' : ''))),
            i      = result.indexOf('I like'),
            me     = result.indexOf('like Me');

        if (i > -1 && me > -1) {
            result.splice(i, 1);
            result.splice(me, 1);
            result.push('match');
        }
        return result;
    }
};
