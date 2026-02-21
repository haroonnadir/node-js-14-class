const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.urlencoded({ extended: false }));

// Serve form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// Submit route
app.post(
  "/submit",

  // ===== REQUIRED + SANITIZATION + VALIDATION =====

  body("name")
    .trim()
    .escape()
    .notEmpty().withMessage("Name is required")
    .isAlpha().withMessage("Name must contain only letters"),

  body("email")
    .normalizeEmail()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),

  body("username")
    .ltrim()
    .rtrim()
    .notEmpty().withMessage("Username is required")
    .isAlphanumeric().withMessage("Username must be alphanumeric")
    .isLength({ min: 5 }).withMessage("Minimum 5 characters required"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isStrongPassword().withMessage("Password must be strong"),

  body("age")
    .notEmpty().withMessage("Age is required")
    .isNumeric().withMessage("Age must be numeric")
    .toInt(),

  body("salary")
    .notEmpty().withMessage("Salary is required")
    .isNumeric().withMessage("Salary must be numeric")
    .toFloat(),

  body("website")
    .notEmpty().withMessage("Website is required")
    .isURL().withMessage("Invalid website URL"),

  body("dob")
    .notEmpty().withMessage("Date of birth is required")
    .isDate().withMessage("Invalid date"),

  body("code")
    .notEmpty().withMessage("Code is required")
    .matches(/^[A-Z]{3}$/).withMessage("Code must be 3 uppercase letters"),

  body("city")
    .notEmpty().withMessage("City is required")
    .isLowercase().withMessage("City must be lowercase"),

  body("bio")
    .trim()
    .escape()
    .notEmpty().withMessage("Bio is required"),

  body("isActive")
    .notEmpty().withMessage("Active status is required")
    .toBoolean(),

  // ===== RESULT HANDLER =====
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    res.json({
      success: true,
      message: "Form submitted successfully ✅",
      data: req.body,
    });
  }
);

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
