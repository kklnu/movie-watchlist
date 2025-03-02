const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Setup
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

// Home Page Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Movie Watchlist' });
});

// 404 Error Page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Page Not Found' });
});

// Server Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
