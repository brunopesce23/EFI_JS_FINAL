import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditUser = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState({ name: '' });
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.log("Error al obtener los datos del usuario");
                }
            } catch (error) {
                console.log("Hubo un error", error);
            }
        };
        getUser();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                console.log("Usuario actualizado");
                navigate('/usuarios'); // Redirigir a la lista de usuarios
            } else {
                console.log("Error al actualizar el usuario");
            }
        } catch (error) {
            console.log("Hubo un error al actualizar el usuario", error);
        }
    };

    return (
        <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </label>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};

export default EditUser;
