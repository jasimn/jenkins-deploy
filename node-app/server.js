const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Version4:noode.js App Deployed via Jenkins ');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
