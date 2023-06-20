const express = require('express');
const mysql = require('mysql2');

//APP / PORT

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE
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

//ROUTES

app.get("/", (req, res)=> res.send("Hello world!"));

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

app.put(`/api/update-review/:id`, (req, res) => {
    const reviewId = req.params.id;
    const updatedReview = req.body.review;
  
    const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  
    db.query(sql, [updatedReview, reviewId], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }
  
      res.json({
        message: 'Review updated successfully!',
        data: {
          reviewId: reviewId,
          review: updatedReview
        }
      });
    });
  });



//START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});