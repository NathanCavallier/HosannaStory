const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Importer le modèle utilisateur
require("dotenv").config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT secret not found");
}

// Inscription
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Enregistrer l'utilisateur
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).send("User registered successfully");
});

// Connexion
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid credentials");
  }

  // Créer un token JWT
  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = { router, authenticateToken };
