module.exports = (req, res) => {
    console.log(req.body);
    res.send([{id:1, tag:'coke'}, {id:2, tag:'sushi'}]);
};
