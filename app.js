var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

app.use(bodyParser.json());

var Genre = require('./models/genre');
var Book = require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore', {useNewUrlParser: true});
var db = mongoose.connection;

// Routing
app.get('/', (req, res) => {
	res.send('Use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){ throw err; }
		res.json(genre);
	});
});

app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){ throw err; }
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){ throw err; }
		res.json(genre);
	});
});

app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){ throw err; }
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){ throw err; }
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){ throw err; }
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){ throw err; }
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) =>{
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){ throw err; }
		res.json(book);
	});
});

app.listen(port);
console.log(`Running on port ${port}`);