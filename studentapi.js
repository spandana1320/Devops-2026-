const express = require("express");
const app = express();

app.use(express.json());

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.json({ message: "Student API Running" });
});

// ================= IN-MEMORY DATABASE =================
let students = [
    { id: 1, name: "Spandana", department: "CSE" },
    { id: 2, name: "Rahul", department: "ECE" }
];

// ================= GET ALL STUDENTS =================
app.get("/students", (req, res) => {
    res.json(students);
});

// ================= GET STUDENT BY ID =================
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// ================= ADD STUDENT =================
app.post("/students", (req, res) => {
    const { id, name, department } = req.body;

    if (!id || !name || !department) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const exists = students.find(s => s.id === id);
    if (exists) {
        return res.status(400).json({ message: "Student ID already exists" });
    }

    students.push({ id, name, department });

    res.status(201).json({ message: "Student added successfully" });
});

// ================= UPDATE STUDENT =================
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, department } = req.body;

    if (name) student.name = name;
    if (department) student.department = department;

    res.json({
        message: "Student updated successfully",
        student
    });
});

// ================= DELETE STUDENT =================
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

// ================= SERVER =================
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
