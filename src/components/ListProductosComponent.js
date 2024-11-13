import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListProductosComponent() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const result = await axios.get("http://localhost:8081/api/v1/productos");
            setProductos(result.data);
        } catch (error) {
            console.log("Error fetching products: ", error);
        }
    };

    const eliminarProducto = async (productoId) => {
        try {
            await axios.delete(`http://localhost:8081/api/v1/productos/${productoId}`);
            cargarProductos(); // Refresh the list after deletion
        } catch (error) {
            console.log("Error deleting product: ", error);
        }
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <h2 className="text-center">Listado de Productos</h2>

            <Link to="/add-producto" className="btn btn-primary mb-3">Agregar Producto</Link>

            <table className="table table-secondary table-hover" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-producto/${producto.id}`}>Actualizar</Link>
                                <button
                                    style={{ marginLeft: "10px" }}
                                    className="btn btn-danger"
                                    onClick={() => eliminarProducto(producto.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListProductosComponent;
