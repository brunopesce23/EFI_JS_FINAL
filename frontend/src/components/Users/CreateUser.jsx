import React, { useState } from 'react';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          usuario: username,
          contrasenia: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.Mensaje || 'Usuario creado exitosamente');
      } else {
        setMessage(data.Mensaje || 'Error al crear el usuario');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleCreateUser}>
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
        <button type="submit">Crear Usuario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
