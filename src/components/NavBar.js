import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/productos">Productos</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
