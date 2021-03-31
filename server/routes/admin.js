const router = require("express").Router();
const db = require("../database");

//---- Admin ----//

// Create Problem
router.post("/problems", async (req, res) => {
  const {
    title,
    description,
    type,
    difficulty,
    image_url,
    author,
    answer,
  } = req.body;

  const {
    rows,
  } = await db.query(
    "INSERT INTO problems (title, description, type, difficulty, image_url, answer, author, active, solved) VALUES($1, $2, $3, $4, $5, $6, $7, false, false) RETURNING *",
    [title, description, type, difficulty, image_url, author, answer]
  );
  res.status(201).json({ success: true, record: rows[0] });
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
