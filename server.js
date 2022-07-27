const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5006;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('TEST!'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
