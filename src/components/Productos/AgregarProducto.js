import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter} from "react-router-dom"; //sirve para redireccionar a una pagina

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // validar los datos
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria.trim() === ""
    ) {
      // mostrar cartel de error
      setError(true);
      return;
    }
    setError(false);
    //    Enviar el producto a la api

    // construir un onjeto con los atos a enviar
    const datos = {
      nombreProducto, //nombreProducto: nombreProducto
      precioProducto,
      categoria,
    };

    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };

      const resultado = await fetch(
        "http://localhost:4000/cafeteria",
        cabecera
      );
      console.log(resultado);
      // si la operacion fue exitosa
      if (resultado.status === 201) {
        Swal.fire(
          "Producto agregado",
          "El producto se agrego correctamente",
          "success"
        );
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, intentelo nuevamente ',
        });
      }
      // actualizar lista de productos
      props.setRecargarProductos(true)
      // redireccionar a alguna pagina
      props.history.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handlesubmit}>
        <h1 className="text-center my-5">Agregar Nuevo Producto</h1>
        {error ? (
          <Alert variant={"danger"}>
            Es necesario llenar todos los productos
          </Alert>
        ) : null}

        <Form.Group>
          <Form.Label>Nombre de producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe con leche"
            name="nombre"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: $50"
            name="precio"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
        </Form.Group>
        <h2 className="text-center my-5">Categoria</h2>

        <Form.Group className="container d-flex justify-content-around">
          <Form.Check
            inline
            type="radio"
            label="Bebida caliente"
            name="categoria"
            value="bebida-caliente"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
            onChange={seleccionarCategoria}
          />
        </Form.Group>
        <Button className="w-100 my-5" type="submit">
          Agregar producto
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(AgregarProducto);
