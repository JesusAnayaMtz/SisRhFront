import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleado() {

    let navegacion = useNavigate();
    
    const [empleado, setEmpleado]=useState({
        nombre: "",
        departamento: "",
        sueldo: ""
    })

    const{nombre, departamento, sueldo} = empleado;

    //metodo para para recibir el ebento del componente
    const onInputChange = (e) => {
        //spread operator ... que es para expandri loa tributos del objeto
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    }

    //nos comunicamos con el back con este evento, es una peticion asincrona y recibimos el evento que lanzo que es el formulario
    //y agregamos el cuerpo y mandamos a llavar el evento preventDefault esto es para evitar que los parametros se pongan en el url ysean parte del cuerpo
    //definnimos una urlbase que es la del back
    //y procesamos la peticion con await esperamos la respuesta y con axios mandamos la peticion post y establecemos dentro la url bas ey le pasamos el empleado
    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/rh-app/empleados";
        await axios.post(urlBase, empleado);
        //redirigimos a la pagina de incio
        navegacion('/');
    }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Agregar Empleado</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departamento" className="form-label">
            Departamento
          </label>
          <input
            type="text"
            className="form-control"
            id="departamento"
            name="departamento"
            value={departamento}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sueldo" className="form-label">
            Sueldo
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="sueldo"
            name="sueldo"
            value={sueldo}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Guardar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}
