const express = require('express');
const path = require('path');
const fortuneRoutes = require('./routes/fortune');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.send('Hello World!')
});

app.use('/api/fortune', fortuneRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Reverse Fortune Cookie server running on port ${PORT}`);
});