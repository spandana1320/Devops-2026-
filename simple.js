const express = require('express');
const app = express();
app.use(express.json());
app.get('/students', (req, res) => {
res.json([{ id: 1, name: "Ravi" }]);
});
app.post('/students', (req, res) => {
const student = req.body;
res.status(201).json({ message: "Student added", data: student });
});
app.listen(3000, () => {
console.log("Server running on port 3000");
});