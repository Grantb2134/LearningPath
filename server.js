const express = require('express');
const cors = require('cors');
const auth = require('./controllers/auth');
const users = require('./controllers/users');
const paths = require('./controllers/paths');
const concepts = require('./controllers/concepts');
const content = require('./controllers/content');

const app = express();
const PORT = 5006;
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/paths', paths);
app.use('/api/concepts', concepts);
app.use('/api/content', content);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
