import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import { log } from 'console';

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

var Login_status = {
  auth_status: 200,
  destination: "",
}

app.post('/login', (req, res) => {
  const { employee_id, password } = req.body;
  console.log(req.body);

  db.query("SELECT employee_id, password, job_type FROM employee WHERE employee_id = $1", [employee_id], (err, result) => {
    if (err) {

      console.error("Error executing query", err.stack);
      res.status(500).json({ auth_status: 500, message: "Internal server error" });
      return;

    }

    if (result.rows.length === 0) {

      console.log("User not found!!");
      Login_status.auth_status = 401;
      res.send(Login_status);
      return;

    }
    const user = result.rows[0];

    if (password === user.password) {

      console.log("User authenticated");
      Login_status.auth_status = 200;
      Login_status.destination = user.job_type;
      res.send(Login_status);
    
    } else {

      console.log("Invalid credentials");
      Login_status.auth_status = 401;
      res.send(Login_status);

    }
  });
});

var emp_data;

app.get('/emp_data', (req, res) => {
  db.query("SELECT * from employee", (err, result) => {
    if (err) {

      console.error("Error executing query", err.stack);
      res.status(500).json({ auth_status: 500, message: "Internal server error" });
      return;

    }

    if(result.rows.length > 0) {
      emp_data = result.rows;
      console.log(emp_data);
      res.send(emp_data);
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
})