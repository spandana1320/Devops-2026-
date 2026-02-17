const express = require('express');
const app = express();

app.use(express.json());

/* ---------------- STUDENT DATA ---------------- */
const students = [
    { id: 1, name: "Spandana", department: "CSE" },
    { id: 2, name: "Rahul", department: "ECE" },
    { id: 3, name: "Anjali", department: "IT" }
];

/* ---------------- MIDDLEWARE (BONUS) ---------------- */
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next();
});

/* ---------------- ROUTES ---------------- */

/* Home Route */
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Student Information Server" });
});

/* Get All Students */
app.get('/students', (req, res) => {
    res.json(students);
});

/* Get Student By ID */
app.get('/students/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Invalid Student ID"
        });
    }

    res.json(student);
});

/* ---------------- SERVER ---------------- */
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
