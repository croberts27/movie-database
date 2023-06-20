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
    const sql = 'SELECT id, movies_names AS title FROM movies';

    db.query(sql, (err, row)=> {
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
