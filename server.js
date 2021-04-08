const express = require('express');
const path = require('path');

const buildPath = path.resolve(process.cwd(), 'build');
const indexHtmlPath = path.join(buildPath, 'index.html');
const port = process.env.PORT || 8080;


const app = express();
app.use('/', express.static(buildPath));
app.get('*', (req, res) => {
   res.sendFile(indexHtmlPath);
});

app.listen(port, () => console.log(`App is listening on port ${port}.`));
