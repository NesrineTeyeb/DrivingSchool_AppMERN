import axios from 'axios';
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister =async (e)=>{
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name,
          email,
          password,
        });
        localStorage.setItem('token', response.data.token); // Save the JWT token to localStorage
        setSuccess('Registration successful!');
        setError(''); // Clear errors
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed.');
        setSuccess(''); // Clear success messages
      }

  }
  return (
    <div>
      <h2>Inscription</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Sign In</button>
      </form>
    </div>
  );
}

export default Register;
