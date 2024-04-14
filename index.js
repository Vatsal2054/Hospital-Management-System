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
        var user = result.rows[0];
        console.log(user);

        if (password === user.password) {

            if (user.job_type === "Doctor") {
                db.query("SELECT * from doctor where employee_id = $1", [user.employee_id], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result.rows.length > 0) {
                        user = { ...user, ...result.rows[0] };
                        console.log("Logging doctor info", user);
                        Login_status.auth_status = 200;
                        Login_status.destination = user.job_type;
                        console.log({ ...user, ...Login_status });
                        res.send({ ...user, ...Login_status });
                    }
                    else {
                        console.log("No data found!");
                    }
                })
            }
            else if(user.job_type === "Nurse"){
                db.query("SELECT * from nurse where employee_id = $1", [user.employee_id], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    if(result.rows.length > 0){
                        user = {...user, ...result.rows[0]};
                        console.log("Logging Nurse Info", user);
                        Login_status.auth_status = 200;
                        Login_status.destination = user.job_type;
                        console.log({ ...user, ...Login_status });
                        res.send({ ...user, ...Login_status });
                    }
                    else{
                        console.log("No data found!!");
                    }
                })
            }
            else {
                console.log("User authenticated");
                Login_status.auth_status = 200;
                Login_status.destination = user.job_type;
                console.log({ ...user, ...Login_status });
                res.send({ ...user, ...Login_status });
            }

        } else {

            console.log("Invalid credentials");
            Login_status.auth_status = 401;
            res.send(Login_status);

        }
    });
});

app.post('/newEmp', (req, res) => {
    console.log(req.body);
    const recData = req.body;
    console.log(recData);

    db.query("SELECT employee_id from employee where employee_id = $1", [recData.employee_id], (err, result) => {
        if (err) {
            res.send(400); recData.
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
            if (recData.job_type === "Doctor") {
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
            else if (recData.job_type === "Nurse") {
                db.query("INSERT INTO nurse values ($1, $2, $3, $4)", [recData.employee_id, recData.nurse_id, recData.name, recData.department], (err, result) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            }
            else if (recData.job_type === "Receptionist") {
                res.sendStatus(200);
            }
        }
    });
});

var emp_data;

app.get('/emp_data',async (req, res) => {
    console.log(req.query.employee);
    const job_type = req.query.employee;
    if(job_type === "Doctor"){
        await db.query("SELECT e.employee_id, e.name, e.contact, e.job_type, TO_CHAR(e.hiredate, 'DD-MM-YYYY') as hiredate, e.password, e.salary, \"Gender\", \"Address\", d.d_id, d.dtype, d.department, d.study_year FROM employee e LEFT JOIN doctor d ON e.employee_id = d.employee_id where e.job_type = $1", [job_type], (err, result) => {
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
    }
    else if(job_type === "Nurse"){
        await db.query("SELECT e.employee_id, e.name, e.contact, e.job_type, TO_CHAR(e.hiredate, 'DD-MM-YYYY') as hiredate, e.password, e.salary, \"Gender\", \"Address\", n.nurse_id, n.departMent FROM employee e LEFT JOIN nurse n ON e.employee_id = n.employee_id where job_type = $1", [job_type], (err, result) => {
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
    }

    else if (job_type === "Receptionist"){
        await db.query("SELECT employee_id, name, contact, job_type, TO_CHAR(hiredate, 'DD-MM-YYYY') as hiredate, password, salary, \"Gender\", \"Address\" FROM employee where job_type = $1", [job_type], (err, result) => {
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
    }
})

app.get('/patients', (req, res) => {
    // console.log(req.query.department);
    const department = req.query.department;

    db.query("SELECT a.patient_id, a.name, a.gender, a.age, a.height, a.weight, a.blood_group, a.admit_date, a.discharge_date, a.contact, b.room_id, b.department, b.unit FROM patient a INNER JOIN pinfo b ON a.patient_id = b.patient_id where a.patient_id in (select patient_id from pinfo where department = $1)", 
    [department], 
    (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }

        if (result.rows.length > 0) {
            res.send(result.rows)
        }
    })
})

app.get('/wardInfo', (req, res) => {
    db.query("SELECT COUNT(patient_id) as totalPatients FROM patient", (err,result) => {
        if(err){
            console.log(err.message);
        }
        else{
            const data = result.rows[0];
            console.log(data);
            res.send(data);
        }
    })
})

app.get('/medInfo',async (req, res) => {
    await db.query("SELECT medicine_id, name from medicines where stock > 0", (err,result) => {
        if(err){
            console.log(err.message);
        }
        else {
            console.log(result.rows);
            res.send(result.rows);
        }
    })
})

app.post('/saveMedInfo', async (req, res) => {
    const recData = req.body;
    console.log(recData);

    await recData.patients.forEach(id => {
        const date = new Date();
        console.log(recData.medicines);
        db.query("INSERT into medication_history(patient_id, medicines, prescription_date) values ($1, $2, $3)", [id, recData.medicines, date.toLocaleDateString()], (err,result) => {
            if(err){
                console.log(err.message);
                res.send({status: 201});
            }
            else{
                console.log("Medications successfully uploaded");
            }
        })
    });
    res.send({status: 200});
})

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})