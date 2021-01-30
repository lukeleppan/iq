require("dotenv").config();
const { Client } = require("pg");
const client = new Client();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json());

//Routes//
// Create Problem
app.post("/api/admin/problem", async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      answer,
    } = req.body;
    const newProblem = await pool.query(
      "INSERT INTO problems \
      (title, description, type, difficulty, image_url, \
        answer, active, solved) VALUES($1, $2, $3, $4, $5, $6, false, false) RETURNING *",
      [title, description, type, difficulty, image_url, answer]
    );

    res.json(newProblem.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Get All Problems
app.get("/api/problems", async (req, res) => {
  try {
    const allProblems = await pool.query("SELECT * FROM problems");
    res.json(allProblems.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000: http://localhost:5000");
});
