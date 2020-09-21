import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import {withRouter} from "react-router-dom"

const EditarProducto = (props) => {
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef("");

  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   validar los datos
    const _categoria = categoria === "" ? props.producto.categoria : categoria;
    console.log(_categoria);
    console.log(nombreProductoRef.current.value);
    console.log(precioProductoRef.current.value);

    if (
      nombreProductoRef.current.value.trim() === "" ||
      precioProductoRef.current.value.trim() === "" ||
      _categoria === ""
    ) {
      // mostrar cartel de error
      setError(true);
      return;
    }

    setError(false);
    // preparar el objeto a enviar
    const productoEditado = {
      nombreProducto: nombreProductoRef.current.value,
      precioProducto: precioProductoRef.current.value,
      categoria: _categoria,
    };
    // envio los cambios preparados

    try {
      const respuesta = await fetch(
        `http://localhost:4000/cafeteria/${props.producto.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoEditado)
        })
        console.log(respuesta);
        if(respuesta.status === 200){
            // efectivamente se modifico el producto
            props.setRecargarProductos(true)
            Swal.fire(
                'Producto modificado',
                'Su producto fue modificado correctamente',
                'success'
            )
            props.history.push("/productos")
        }

    } catch (datosError) {
      console.log(datosError);
      //  cartelito para el usuario
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
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
            ref={nombreProductoRef}
            defaultValue={props.producto.nombreProducto}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: $50"
            ref={precioProductoRef}
            defaultValue={props.producto.precioProducto}
          />
        </Form.Group>
        <h2 className="text-center my-5">Categoria</h2>

        <Form.Group className="container d-flex justify-content-around">
          <Form.Check
            type="radio"
            label="Bebida caliente"
            name="categoria"
            value="bebida-caliente"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "bebida-caliente"}
          />
          <Form.Check
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "bebida-fria"}
          />
          <Form.Check
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "sandwich"}
          />
          <Form.Check
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "dulce"}
          />
          <Form.Check
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "salado"}
          />
        </Form.Group>
        <Button className="w-100 my-5" type="submit">
          Agregar producto
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(EditarProducto);
