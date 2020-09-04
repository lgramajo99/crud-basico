import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Producto from "./Producto";
const ListaProducto = (props) => {
  return (
    <section className="container ">
      <h1 className="text-center my-5">Lista productos</h1>
      <ListGroup>
        {props.productos.map((itemProducto) => (
          <Producto key={itemProducto.id} producto={itemProducto} setRecargarProductos={props.setRecargarProductos}></Producto>
        ))}
      </ListGroup>
    </section>
  );
};

export default ListaProducto;
