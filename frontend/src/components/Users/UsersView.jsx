import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UsersView = () => {
  const { id } = useParams(); // Obtén el ID del usuario desde la URL
  const [user, setUser] = useState(null); // Estado para almacenar el usuario
  const [error, setError] = useState(''); // Estado para manejar errores

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token JWT
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al obtener el usuario');
          return;
        }

        const data = await response.json();
        setUser(data); // Almacena los datos del usuario
      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Admin:</strong> {user.is_admin ? 'Sí' : 'No'}</p>
      <p><strong>Password Hash:</strong> {user.password_hash}</p>
    </div>
  );
};

export default UsersView;
