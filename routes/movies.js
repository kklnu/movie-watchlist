const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../db.json');

// Load movies from JSON file
const loadMovies = () => {
    try {
        return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    } catch (err) {
        return [];
    }
};

// Save movies to JSON file
const saveMovies = (movies) => {
    fs.writeFileSync(dataFile, JSON.stringify(movies, null, 2), 'utf8');
};

// Get all movies and render index page
router.get('/', (req, res) => {
    res.render('index', { title: 'Movie Watchlist', movies: loadMovies() });
});

// Get a single movie page
router.get('/:id', (req, res) => {
    const movies = loadMovies();
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).render('error', { title: 'Movie Not Found' });
    }
    res.render('movie', { title: movie.title, movie });
});

// Add a new movie
router.post('/', (req, res) => {
    const movies = loadMovies();
    const newMovie = {
        id: movies.length ? movies[movies.length - 1].id + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        watched: req.body.watched || false,
        rating: req.body.rating || 0
    };
    movies.push(newMovie);
    saveMovies(movies);
    res.redirect('/');
});


// Delete a movie
router.delete('/:id', (req, res) => {
    let movies = loadMovies();
    movies = movies.filter(m => m.id !== parseInt(req.params.id));
    saveMovies(movies);
    res.json({ message: 'Movie deleted' });
});

module.exports = router;
