module.exports = (history, action, id = null) => {
    if (history) {
        let actions = history.map(row => row.action),
            filteredActions = history.map(row => row.first_id === id ? row.action : false);
        if (id) {
            return filteredActions.includes(action);
        } else {
            return actions.includes(action);
        }
    }
    return false;
};
