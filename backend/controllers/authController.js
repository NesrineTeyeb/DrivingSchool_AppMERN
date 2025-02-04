//# Logique métier (ex: gestion des utilisateurs, réservations)
// Authentification (inscription, connexion)
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Inscription User:
// req.body : Contient les données envoyées par le client dans la requête HTTP (ici name, email, et password).
// bcrypt.hash(password, 10) : Utilise la bibliothèque bcrypt pour hasher le mot de passe de l'utilisateur. Le nombre 10 est le "salt rounds" (un facteur de coût pour rendre le hash plus complexe et sécurisé).
// User.create(...) : Crée un nouvel utilisateur dans la base de données avec les informations récupérées. Le mot de passe est stocké sous forme de hash.
// res.status(201).json(user) : Une fois l'utilisateur créé, la fonction répond avec un code de statut 201 (indiquant que la ressource a été créée) et retourne les informations de l'utilisateur (sans le mot de passe).
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà dans la base de données
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "L'utilisateur existe déjà" });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save(); // Sauvegarder l'utilisateur dans la base de données
    savedUser.password = undefined; // On ne renvoie pas le mot de passe

    // Génération d'un token JWT
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Le token expire dans 1 heure (tu peux ajuster la durée)
    });

    res.status(201).json({ user: savedUser, token }); // Retourner l'utilisateur et le token
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'inscription de l'utilisateur",
      error: error.message,
    });
  }
};

//LoginUser:
// req.body : Contient les informations envoyées par le client (ici, email et password).
// User.findOne({ email }) : Recherche un utilisateur dans la base de données en fonction de son email.
// bcrypt.compare(password, user.password) : Compare le mot de passe saisi avec le mot de passe haché stocké dans la base de données. Si les mots de passe ne correspondent pas, l'authentification échoue.
// res.status(401).json({ message: "Identifiants incorrects" }) : Si l'email n'existe pas ou si les mots de passe ne correspondent pas, renvoie une réponse d'erreur avec un statut HTTP 401 (Non autorisé) et un message d'erreur.
// jwt.sign({ id: user._id }, process.env.JWT_SECRET) : Génère un token JWT en utilisant l'ID de l'utilisateur comme payload et une clé secrète stockée dans process.env.JWT_SECRET. Ce token est ensuite envoyé au client pour l'authentification lors des futures requêtes.
// res.json({ token }) : Retourne le token JWT généré au client.
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Récupère les informations d'identification depuis le corps de la requête
  const user = await User.findOne({ email }); // Cherche l'utilisateur dans la base de données par email

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
    return res.status(401).json({ message: "Identifiants incorrects" }); // Retourne une erreur 401 (non autorisé)
  }

  // Crée un token JWT avec l'ID de l'utilisateur et une expiration (par exemple 1 heure)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token }); // Retourne le token JWT au client
};
