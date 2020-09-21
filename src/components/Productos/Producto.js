import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Producto = (props) => {
  const eliminarProducto = (id) => {
    console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No podras recuperar si eliminas el producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        // aqui tengo que eliminar el producto
        try {
          const resultado = await fetch(
            `http://localhost:4000/cafeteria/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(resultado);

          if (resultado.status === 200) {
            props.setRecargarProductos(true);
            Swal.fire(
              "Eliminado",
              "Su producto a sido eliminado correctamente",
              "success"
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error, intentelo nuevamente ",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error, intentelo nuevamente ",
          });
        }
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p className="">
        {props.producto.nombreProducto}{" "}
        {/* <spam className="font-weight-bold"> */}$
        {props.producto.precioProducto}
        {/* </spam> */}
      </p>
      <div>
        <Link
          className="btn btn-info mx-1"
          to={`/productos/editar/${props.producto.id}`}
        >
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Link>

        <Button
          variant="danger"
          className="mx-1"
          type="button"
          onClick={() => eliminarProducto(props.producto.id)}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>

        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default Producto;
