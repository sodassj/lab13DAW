package com.tecsup.controller;

import com.tecsup.exception.ResourceNotFoundException;
import com.tecsup.model.Producto;
import com.tecsup.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // List all products
    @GetMapping("/productos")
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Save a new product
    @PostMapping("/productos")
    public Producto guardarProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // Get a product by ID
    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> listarProductoPorId(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El producto no existe: " + id));
        return ResponseEntity.ok(producto);
    }

    // Update a product
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoRequest) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El producto no existe: " + id));

        producto.setNombre(productoRequest.getNombre());
        producto.setDescripcion(productoRequest.getDescripcion());
        producto.setPrecio(productoRequest.getPrecio());
        producto.setStock(productoRequest.getStock());

        Producto productoActualizado = productoRepository.save(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    // Delete a product
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El producto no existe: " + id));

        productoRepository.delete(producto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

