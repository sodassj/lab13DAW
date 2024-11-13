import React, { useState, useEffect } from 'react';
import ProductoService from '../services/ProductoService'; // Asegúrate de crear el servicio para productos
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const AddProductoComponent = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState(''); 
    const navigate = useNavigate();

    const { id } = useParams();  

    const saveOrUpdateProducto = (e) => {
        e.preventDefault();
        const producto = { nombre, descripcion, precio, stock };

        if (id) {
            // Si hay un ID, se actualiza el producto
            ProductoService.updateProducto(id, producto).then((response) => {
                console.log(producto);
                navigate('/productos');    
            }).catch(error => {
                console.log(error);
            })
        } else {
            // Si no hay ID, se crea un nuevo producto
            ProductoService.createProducto(producto).then((response) => {
                console.log(producto);
                navigate('/productos');    
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            ProductoService.getProductoById(id).then(response => {
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
                setPrecio(response.data.precio);
                setStock(response.data.stock); 
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id]);

    const titulo = () => {
        if (id) {
            return <h2 className='text-center'>Actualizar Producto</h2>;
        } else {
            return <h2 className='text-center'>Registrar Producto</h2>;
        }
    }

    return (
        <div>
            <div className='container' style={{ marginTop: "80px" }}>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2>{titulo()}</h2>

                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre:</label>
                                    <input
                                        type='text'
                                        placeholder='Escriba el nombre del producto'
                                        name='txtNombre'
                                        className='form-control'
                                        value={nombre} onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Descripción:</label>
                                    <input
                                        type='text'
                                        placeholder='Escriba la descripción'
                                        name='txtDescripcion'
                                        className='form-control'
                                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Precio:</label>
                                    <input
                                        type='number'
                                        placeholder='Escriba el precio'
                                        name='txtPrecio'
                                        className='form-control'
                                        value={precio} onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Stock:</label> 
                                    <input
                                        type='number'
                                        placeholder='Escriba el stock'
                                        name='txtStock' 
                                        className='form-control'
                                        value={stock} onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className='botones'>
                                    <button className='btn btn-danger' onClick={(e) => saveOrUpdateProducto(e)}>Guardar</button>                                    
                                    <Link to='/productos' className='btn btn-primary'>Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductoComponent;
