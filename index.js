import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Hospital_Management_System",
    password: "Vatsal@2004",
    port: 5432,
  });
  
  db.connect();

const data = [
    { id: 1, name: 'Vatsal' },
    { id: 2, name: 'Shardul' }
]

app.get('/data', (req, res) => {
    res.json(data);
});

app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data);
    res.sendStatus(202);
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})