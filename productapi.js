const express = require("express");
const app = express();

app.use(express.json());

// ================= REQUEST LOGGING MIDDLEWARE =================
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.json({ message: "Employee Management API Running" });
});

// ================= IN-MEMORY DATABASE =================
let employees = [
    { id: 1, name: "Spandana", designation: "Software Engineer", salary: 50000 },
    { id: 2, name: "Rahul", designation: "Tester", salary: 40000 }
];

// ================= GET ALL EMPLOYEES =================
app.get("/employees", (req, res) => {
    res.json(employees);
});

// ================= GET EMPLOYEE BY ID =================
app.get("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
});

// ================= ADD EMPLOYEE =================
app.post("/employees", (req, res) => {
    const { id, name, designation, salary } = req.body;

    if (!id || !name || !designation || !salary) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const exists = employees.find(e => e.id === id);
    if (exists) {
        return res.status(400).json({ message: "Employee ID already exists" });
    }

    employees.push({ id, name, designation, salary });

    res.status(201).json({ message: "Employee added successfully" });
});

// ================= UPDATE EMPLOYEE =================
app.put("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    const { name, designation, salary } = req.body;

    if (name) employee.name = name;
    if (designation) employee.designation = designation;
    if (salary) employee.salary = salary;

    res.json({
        message: "Employee updated successfully",
        employee
    });
});

// ================= DELETE EMPLOYEE =================
app.delete("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees.splice(index, 1);

    res.json({ message: "Employee deleted successfully" });
});

// ================= ERROR HANDLING MIDDLEWARE =================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// ================= SERVER =================
app.listen(3000, () => {
    console.log("Employee API running at http://localhost:3000");
});
