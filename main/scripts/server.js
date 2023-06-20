const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Bigmansql123!',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

app.get('/api/movies', (req, res)=>{
    const sql = 'SELECT id, movie_name AS title FROM movies';

    db.query(sql, (err, rows)=> {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});


app.get('/api/reviews', (req, res)=>{
    const sql = 'SELECT review FROM reviews';

    db.query(sql, (err, rows)=> {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

app.delete(`/api/movie/:id`, (req,res)=>{
    const sql = `DELETE FROM movies WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, (err, rows)=> {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
})

app.post(`/api/add-movie`, (req, res)=>{
    const sql = `INSERT INTO movies(movie_name) VALUES (?) `
    // console.log(req.body.title);
    db.query(sql, req.body.title,(err, rows)=>{
        if(err){
            res.status(500).json({error: err.message});
            return;  
        }
        res.json({
            message: 'Success!',
            data: rows
        })
    })
})

app.post(`/api/update-review`, (req, res)=>{
    const sql = `INSERT INTO reviews(review) WHERE id VALUES (?) `
    // console.log(req.body.review);
    db.query(sql, req.body.review,(err, rows)=>{
        if(err){
            res.status(500).json({error: err.message});
            return;  
        }
        res.json({
            message: 'Success!',
            data: rows
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});