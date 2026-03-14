const express = require('express');
const { db, Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());

// Test database connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();


// GET /api/tracks - Get all tracks
app.get('/api/tracks', async (req, res) => {
    try {
        const tracks = await Track.findAll();
        res.json(tracks);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});


// GET /api/tracks/:id - Get track by ID
app.get('/api/tracks/:id', async (req, res) => {
    try {
        const track = await Track.findByPk(req.params.id);
        
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        
        res.json(track);
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).json({ error: 'Failed to fetch track' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});