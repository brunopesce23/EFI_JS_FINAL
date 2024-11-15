import React, { useEffect, useState } from 'react';

const UsersContainer = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [error, setError] = useState(''); // Estado para manejar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token JWT
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, // Incluye el token en el encabezado
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al obtener los usuarios');
          return;
        }

        const data = await response.json();
        setUsers(data); // Almacena los usuarios en el estado
      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra errores */}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Password Hash</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.is_admin ? 'Sí' : 'No'}</td>
              <td>{user.password_hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersContainer;
