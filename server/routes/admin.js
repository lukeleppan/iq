const router = require("express").Router();
const db = require("../database");

//---- Admin ----//

// Create Problem
router.post("/problems", (req, res) => {
  try {
    const {
      title,
      description,
      type,
      difficulty,
      image_url,
      answer,
    } = req.body;
    const newProblem = db.query(
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
router.put("/problems/:id", (req, res) => {
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
    const updateProblem = db.query(
      "UPDATE problems SET title = $2, description = $3, type = $4, difficulty = $5, Image_url = $6, answer = $7 \
      WHERE problem_id = $1",
      [id, title, description, type, difficulty, image_url, answer]
    );

    res.json(updateProblem);
  } catch (error) {
    console.error(error);
  }
});

// Delete Problem

//---------------//

module.exports = router;
