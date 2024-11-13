import React from 'react';
import './App.css';
import ListClientesComponent from './components/ListClientesComponent'; // Asegúrate de que la ruta sea correcta
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddClientesComponent from './components/AddClientesComponent';
import ListProductosComponent from './components/ListProductosComponent';
import AddProductoComponent from './components/AddProductoComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListClientesComponent />}></Route>
            <Route  path='/clientes' element={<ListClientesComponent />}></Route>
            <Route  path='/add-cliente' element={<AddClientesComponent />}></Route>
            <Route  path='/edit-cliente/:id' element={<AddClientesComponent />}></Route>   
            <Route  path='/productos' element={<ListProductosComponent />}></Route>
            <Route  path='/add-producto' element={<AddProductoComponent />}></Route>
            <Route  path='/edit-producto/:id' element={<AddProductoComponent />}></Route>     
          </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
