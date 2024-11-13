import axios from 'axios'; // Asegúrate de importar axios

const PRODUCTO_BASE_REST_API_URL = "http://localhost:8081/api/v1/productos";

class ProductoService {
    // Obtener todos los productos
    getAllProductos() {
        return axios.get(PRODUCTO_BASE_REST_API_URL);
    }

    // Crear un nuevo producto
    createProducto(producto) {
        return axios.post(PRODUCTO_BASE_REST_API_URL, producto);
    }

    // Obtener un producto por ID
    getProductoById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }

    // Actualizar un producto existente
    updateProducto(productoId, producto) {
        return axios.put(PRODUCTO_BASE_REST_API_URL + '/' + productoId, producto);
    }

    // Eliminar un producto
    deleteProducto(productoId) {
        return axios.delete(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }
}

export default new ProductoService();
