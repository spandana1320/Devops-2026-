const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let students = [];
app.get('/', (req, res) => {
res.send(`
<h2>Add Student</h2>
<form method="POST" action="/students">
<input type="text" name="name" placeholder="Enter name" />
<button type="submit">Add</button>
</form>
`);
});
app.post('/students', (req, res) => {
const name = req.body.name;
const newStudent = {
id: students.length + 1,
name: name
};
students.push(newStudent);
res.send("Student Added Successfully!");
});
app.get('/students', (req, res) => {
res.json(students);
});
app.listen(3000, () => {
console.log("Server running on port 3000");
});