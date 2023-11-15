const express = require('express');
const appRoute = require('./routes/route.js')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', appRoute);

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})