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

var employee_data;


app.post('/login', (req, res) => {
  const data = req.body;
  console.log(data);
  db.query("SELECT * FROM employee", (err, res) => {
      if (err) {
        console.error("Error executing query", err.stack);
      } else {
        employee_data = res.rows;
      }
      console.log(employee_data);
      return employee_data;
  });
    res.send(employee_data);
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})