import React, {useState, useEffect} from 'react';
import './App.css';
import './bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Inicio from './components/Principal/Inicio'
import ListaProducto from './components/Productos/ListaProducto';
import AgregarProducto from './components/Productos/AgregarProducto';
import EditarProductos from './components/Productos/EditarProducto';
import Header from './components/common/Header';
import Footer from './components/common/Footer'
import Swal from "sweetalert2";
import PaginaError from './components/Error404/PaginaError';

function App() {
  const [productos, setProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  useEffect(()=>{
    if(recargarProductos === true){
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos])

  const consultarAPI = async() => {
    try{
      // obtener lista de productos
      const consulta = await fetch("http://localhost:4000/cafeteria");
      console.log(consulta);
      const respuesta = await consulta.json();
      console.log(respuesta);
      console.log(consulta.status);
      if(await consulta.status !== 200){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, intentelo nuevamente ',
        });
      }
      // guardar en el state
      setProductos(respuesta)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path ="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path= "/productos">
          <ListaProducto productos={productos} setRecargarProductos={setRecargarProductos}></ListaProducto>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto setRecargarProductos={setRecargarProductos}></AgregarProducto>
        </Route>
        <Route exact path="/productos/editar/:id" render={(props)=>{
          // codigo a ejecutar antes de renderizar el componente
          // obtener el id de la ruta
          const idProducto = parseInt(props.match.params.id)
          console.log(idProducto);

          // buscar el producto que coincida con el id
          const productoSelecionado = productos.find(producto => producto.id === idProducto )
          // mostrar el componente editarProducto
          return <EditarProductos producto={productoSelecionado} setRecargarProductos={setRecargarProductos}></EditarProductos>
        }}>
        </Route>
        <Route exact path="*" >
        <PaginaError></PaginaError>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
