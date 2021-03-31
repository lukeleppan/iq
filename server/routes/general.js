const router = require("express").Router();
const pool = require("./config/database");

//---- General ----//
// Get All Problems
router.get("/problems", (req, res) => {
  try {
    const allProblems = db.query("SELECT * FROM problems");
    res.json(allProblems.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get Problem by ID
router.get("/problems/:id", (req, res) => {
  try {
    const { id } = req.params;
    const problem = db.query("SELECT * FROM problems WHERE problem_id = $1", [
      id,
    ]);

    res.json(problem.rows);
  } catch (error) {
    console.error(error);
  }
});

// Get Active Problem
router.get("/problems/active", (req, res) => {
  try {
    const { id } = req.params;
    const problem = db.query("SELECT * FROM problems WHERE problem_id = $1", [
      id,
    ]);

    res.json(problem.rows);
  } catch (error) {
    console.error(error);
  }
});

//-----------------//

module.exports = router;
