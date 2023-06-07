const express = require("express");
const router = express.Router();

const behaviors = [
  "College",
  "Sports",
  "Communication",
  "Programming",
  "Health",
];

router.get("/", (req, res) => {
  res.json(behaviors);
});

module.exports = router;