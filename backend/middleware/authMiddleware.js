// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Veuillez vous connecter." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // On ajoute l'utilisateur décodé à la requête
    next();  // Passer au prochain middleware ou route
  } catch (error) {
    res.status(400).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
