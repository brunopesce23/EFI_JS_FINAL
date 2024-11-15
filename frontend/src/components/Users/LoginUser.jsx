import React, { useState } from 'react';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.Token);
        setMessage('Login exitoso');
      } else {
        setMessage(data.Mensaje || 'Error en el login');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginUser;
