const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const autenticar = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/validate", authController.validate);

module.exports = router;
