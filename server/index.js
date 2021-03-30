require("dotenv").config();
const { Client } = require("pg");
const client = new Client();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors(origin("localhost")));
app.use(express.json());

//Routes//

//Admin//
// Create Problem
app.post("/api/admin/problems", async (req, res) => {
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
        answer, active) VALUES($1, $2, $3, $4, $5, $6, false) RETURNING *",
      [title, description, type, difficulty, image_url, answer]
    );

    res.json(newProblem.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Update Problem
app.put("/api/admin/problems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      answer,
    } = req.body;
    const updateProblem = await pool.query(
      "UPDATE problems SET title = $2, description = $3, type = $4, difficulty = $5, Image_url = $6, answer = $7 \
      WHERE problem_id = $1",
      [id, title, description, type, difficulty, image_url, answer]
    );
  } catch (error) {
    console.error(error);
  }
});
// Delete Problem

//General//
// Get All Problems
app.get("/api/problems", async (req, res) => {
  try {
    const allProblems = await pool.query("SELECT * FROM problems");
    res.json(allProblems.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get Problem by ID
app.get("/api/problems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await pool.query(
      "SELECT * FROM problems WHERE problem_id = $1",
      [id]
    );

    res.json(problem.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get Active Problem
app.get("/api/problems/active", async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await pool.query(
      "SELECT * FROM problems WHERE problem_id = $1",
      [id]
    );

    res.json(problem.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000: http://localhost:5000");
});
