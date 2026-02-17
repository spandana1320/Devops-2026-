const express = require("express");

const app = express();
app.use(express.json());

// In-memory user storage
let users = [];

// -------- Middleware (Fake Auth Check) --------
function authMiddleware(req, res, next) {
    const isLoggedIn = true; // change to false to test protection

    if (!isLoggedIn) {
        return res.status(401).json({ message: "Unauthorized. Please login." });
    }
    next();
}

// -------- Routes --------

// Home Route
app.get("/", (req, res) => {
    res.send("Authentication Server Running");
});

// Register Route
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    // (Conceptual password hashing – simple demo)
    const hashedPassword = "hashed_" + password;

    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});

// Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = "hashed_" + password;

    const user = users.find(
        u => u.username === username && u.password === hashedPassword
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
});

// Protected Dashboard Route
app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to Dashboard (Protected Route)" });
});

// -------- Server --------
app.listen(3000, () => {
    console.log("Auth Server running at http://localhost:3000");
});
