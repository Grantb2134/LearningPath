const express = require('express');
const cors = require('cors');
const users = require('./controllers/users');
const paths = require('./controllers/paths');

const app = express();
const PORT = 5006;
app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/paths', paths);

app.get('/', (req, res) => res.send('TEST!'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
