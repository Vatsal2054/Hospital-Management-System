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

  db.query("SELECT * FROM employee WHERE employee_id = $1", [employee_id], (err, result) => {
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
    console.log(user);

    if (password === user.password) {

      console.log("User authenticated");
      Login_status.auth_status = 200;
      Login_status.destination = user.job_type;
      console.log({...user, ...Login_status});
      res.send({...user, ...Login_status});

    } else {

      console.log("Invalid credentials");
      Login_status.auth_status = 401;
      res.send(Login_status);

    }
  });
});

app.post('/newDoc', (req, res) => {
  console.log(req.body);
  const recData = req.body;
  console.log(recData);

  db.query("SELECT employee_id from employee where employee_id = $1", [recData.employee_id], (err, result) => {
    if (err) {
      res.send(400);recData.
      console.log(err.message);
    }
    else if (result.rows.length !== 0) {
      res.send(201);
    }
  });

  db.query("INSERT INTO employee values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [recData.employee_id, recData.name, recData.contact, recData.job_type, recData.hiredate, recData.password, recData.salary, recData.Gender, recData.Address], (err, result) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    }
    else {
      console.log("Data Inserted!!");
      if(recData.job_type === "Doctor"){
        db.query("INSERT INTO doctor values ($1, $2, $3, $4, $5, $6)", [recData.d_id, recData.employee_id, recData.name, recData.dtype, recData.department, recData.study_year], (err, result) => {
          if (err) {
            console.log(err.message);
          }
          else {
            console.log("Doctor Inserted!!");
            console.log(result);
            res.sendStatus(200);
          }
        });
      }
      else if (recData.job_type === "Nurse"){
        db.query("INSERT INTO nurse values ($1, $2, $3, $4)", [recData.employee_id, recData.nurse_id, recData.name, recData.department], (err, result) => {
          if (err) {
            console.log(err.message);
          }
          else {
            res.sendStatus(200);
          }
        });
      }
      else if (recData.job_type === "Receptionist"){
        res.sendStatus(200);
      }
    }
  });
});

var emp_data;

app.get('/emp_data', (req, res) => {
  console.log(req.query.employee);
  const job_type = req.query.employee;
  db.query("SELECT * from employee where job_type = $1", [job_type], (err, result) => {
    if (err) {

      console.error("Error executing query", err.stack);
      res.status(500).json({ auth_status: 500, message: "Internal server error" });
      return;

    }

    if (result.rows.length > 0) {
      emp_data = result.rows;
      // console.log(emp_data);
      res.send(emp_data);
    }
  });
})

app.get('/employee', (req, res) => {
  console.log(req.query.employee);
  const job_type = req.query.employee;
  db.query("SELECT * from employee where employee_id = $1", [job_type], (err, result) => {
    if (err) {

      console.error("Error executing query", err.stack);
      res.status(500).json({ auth_status: 500, message: "Internal server error" });
      return;

    }

    if (result.rows.length > 0) {
      emp_data = result.rows;
      console.log(emp_data);
      res.send(emp_data);
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
})