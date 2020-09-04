import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert'

const EditarProducto = () => {
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(false)

    const seleccionarCategoria = (e) => {
        setCategoria(e.target.value);
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        // validar los datos
        if (
            nombreProducto.trim() === "" ||
            precioProducto.trim() === "" ||
            categoria.trim() === ""
        ) {
            setError(true)
            return;
        }
        setError(false)
        //    Enviar el producto a la api

        // construir un onjeto con los atos a enviar
        const datos = {
            nombreProducto,
            precioProducto,
            categoria
        }
    }

    return (
        <div className="container">
            <Form onSubmit={handlesubmit}>
            <h1 className="text-center my-5">Agregar Nuevo Producto</h1>
                <Alert variant={"danger"} onChange={handlesubmit}>
                    Es necesario llenar todos los productos
                </Alert>
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
                    <Form.Control type="text" placeholder="Ej: $50" name="precio" onChange={(e) => setPrecioProducto(e.target.value)} />
                </Form.Group>
                <h2 className="text-center my-5">Categoria</h2>

                <Form.Group className="container d-flex justify-content-around">
                    <Form.Check type="radio" label="Bebida caliente" name="categoria" value="bebida-caliente" onChange={seleccionarCategoria} />
                    <Form.Check type="radio" label="Bebida fria" name="categoria" value="bebida-fria" onChange={seleccionarCategoria} />
                    <Form.Check type="radio" label="Sandwich" name="categoria" value="sandwich" onChange={seleccionarCategoria} />
                    <Form.Check type="radio" label="Dulce" name="categoria" value="dulce" onChange={seleccionarCategoria} />
                    <Form.Check type="radio" label="Salado" name="categoria" value="dulce" onChange={seleccionarCategoria} />
                </Form.Group>
                <Button className="w-100 my-5" type="submit">Agregar producto</Button>
            </Form>
        </div>
    );
};

export default EditarProducto;