const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thunk1'
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(200).json(results);
    });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(201).json({ id: results.insertId, title, content });
    });
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        console.log(results); // Log the results to the console
        res.status(200).json({ id, title, content });
    });
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM posts WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.status(200).json({ id });
    });
});