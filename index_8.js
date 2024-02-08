const express = require('express');
const app = express();
function positiveIntegerHandler(req, res) {

    const number = parseInt(req.params.number);
    if (number > 0) {
        res.send('The input is a positive integer');
    }
    else {
        res.status(400).send('The input is not a positive integer');
    }
}

app.get('/positive/:number', positiveIntegerHandler);
app.get('/', (req, res) => {
    res.redirect('/positive/5');
});
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});