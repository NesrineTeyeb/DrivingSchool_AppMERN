import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!name || !email || !password || !confirmPassword) {
      setError("Tous les champs sont requis");
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSuccessMessage("Inscription réussie !");
        setError(""); // Réinitialiser les erreurs
        setTimeout(() => navigate("/login"), 2000); // Redirection après succès
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
      setSuccessMessage(""); // Réinitialiser le message de succès
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <div className="error" style={{ color: "red" }}>{error}</div>}
      {successMessage && <div className="success" style={{ color: "green" }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Entrez votre nom"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Entrez votre email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirmez votre mot de passe"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà un compte ? <a href="/login">Connectez-vous ici</a>
      </p>
    </div>
  );
}

export default SignUp;
