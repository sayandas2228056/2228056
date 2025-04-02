const express = require("express");
const { getNumbers } = require("../services/numberService");

const router = express.Router();

router.get("/:numberid", getNumbers);

module.exports = router;
