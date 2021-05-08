const router = require("express").Router();
const db = require("../database");
const utils = require("../lib/utils");
const moment = require("moment");

//---- General ----//
// Get Problem by ID
router.get("/problems/:id", async (req, res) => {
  const { id } = req.params;
  const problem = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, author\
     FROM problems WHERE problem_id = $1;",
    [id]
  );

  if (problem.error) {
    return res.status(500).json({ success: false });
  }

  if (problem.rowCount == 0) {
    return res
      .status(401)
      .json({ success: false, msg: "problem doesn't exist" });
  }

  return res.status(200).json({ success: true, problem: problem.rows[0] });
});

// Get Solved Problem
router.get("/problem/solved", async (req, res) => {
  const problems = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, answer, author, active_date, solved_date\
     FROM problems WHERE solved = true",
    []
  );

  if (problems.error) {
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({ problems: problems.rows });
});

// Get Active Problem
router.get("/problem/active", async (req, res) => {
  const currentActiveProblems = await db.query(
    "SELECT problem_id, title, description, type, difficulty, image_url, author, active_date\
     FROM problems WHERE active = true AND closed = false;",
    []
  );

  if (currentActiveProblems.error) {
    return res.status(500).json({ success: false });
  }

  if (currentActiveProblems.rowCount == 0) {
    return res.status(200).json({ success: true, no_active: true });
  }

  const activeDate = moment(currentActiveProblems.rows[0].active_date);
  const diff = currentActiveProblems.rows[0].difficulty;
  const nowDate = moment(Date.now());

  if (moment.max([activeDate, nowDate]) === activeDate) {
    return res.status(200).json({
      success: true,
      no_active: false,
      active_date: activeDate,
    });
  }

  const successes = await db.query(
    "SELECT COUNT(0) FROM attempts WHERE problem_id = $1 AND success = true;",
    [currentActiveProblems.rows[0].problem_id]
  );

  if (successes.error) {
    return res.status(500).json({ success: false });
  }

  const users = await db.query(
    "SELECT users.username, users.displayname, users.house, attempts.points FROM attempts INNER JOIN users\
    ON users.username = attempts.username WHERE attempts.problem_id = $1 AND attempts.success = true ORDER BY attempts.attempt_id;",
    [currentActiveProblems.rows[0].problem_id]
  );

  if (users.error) {
    return res.status(500).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    problem: currentActiveProblems.rows[0],
    users: users.rows,
    points: utils.calcScore(activeDate, diff, successes.rows[0].count),
  });
});

//---------------------//

//---- Leaderboard ----//
router.get("/leaderboard/houses", async (req, res) => {
  const getHouseData = await db.query(
    "SELECT attempts.house, houses.house_name, SUM(attempts.points) AS points FROM attempts, houses WHERE house = house_id GROUP BY attempts.house, houses.house_name;"
  );

  if (getHouseData.error) {
    return res.status(500).json({ success: false });
  }

  let rows = getHouseData.rows;
  let savory = false;
  let dalberg = false;
  let hurley = false;

  rows.forEach((house) => {
    if (house.house === "1") {
      dalberg = true;
    }

    if (house.house === "2") {
      savory = true;
    }

    if (house.house === "3") {
      hurley = true;
    }
  });

  if (!dalberg) {
    rows.push({ house: "1", house_name: "Dalberg", points: "0" });
  }

  if (!savory) {
    rows.push({ house: "2", house_name: "Savory", points: "0" });
  }

  if (!hurley) {
    rows.push({ house: "3", house_name: "Hurley", points: "0" });
  }

  rows.sort((a, b) => {
    return "" + parseInt(a.house) - parseInt(b.house);
  });

  return res.status(200).json({ success: true, houses: rows });
});

router.get("/leaderboard/users");

module.exports = router;
