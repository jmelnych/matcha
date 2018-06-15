const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/users', (req, res) => {
	console.log('node is ok');
    console.log(req.body);
    res.json({title: 'hello world'});
  //   return new Promise((res) => {
  //   user = {
  //     id: 1,
  //   }
  //   res(user)
  // })
});



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);