const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello from Azure! 🚀');
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Server is working!',
        port: PORT,
        env: process.env.NODE_ENV || 'not set'
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});