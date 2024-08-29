import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListadoEmpleados() {



  //definimos un atributo que sera la url base del back
  const urlBase = "http://localhost:8080/rh-app/empleados";


  //definimos un arreglo para se utilizara para estar pendiente de cuaquier cambio un aarreglo empleado y su set para poder mdoficar su valor y 
  //usamos el hok de usestate para monitorear los cambio y se sincronize con la vista
  const[empleados, setEmpleados] = useState([]);

  //una vez que se cargo la pagina usamos el hook de useEfect se llama cuando se carga  con este metodo
  //la pagina el cual cargara nuestros empleados le agreramos al final un areglo vacio el cual hara que se ejecute solo una vez ese hook si no siempre estara consultando a nuestro back
  useEffect(() => {
    cargarEmpleados();
  },[]);

  //definimos una constante la cual sera una funcion, al ser una fucnion de asincrono ocupamos async y con uan funcio flecha agregamos el cuerpo dentro creamos una constante la cual retornara 
  //y hara la solicitud al back con await para esperar la respuesta y con axios hacemos la peticion get al back, se debe instalar el modulo para usar axios
  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado")
    console.log(resultado.data); //imprimimos los datos que estamos recibiendo con data
    setEmpleados(resultado.data); //con el metodo set vamos a cargar los datos que recibimos (resultado) y los agregamos a nuestro arreglo de empleados
  }

  const eliminarEmpleado = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${urlBase}/${id}`);
        cargarEmpleados();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        //recargamos llamando al metodo cargar empleados para que actualice 
      }
    });
    cargarEmpleados();
  }

    //  const eliminarEmpleado = async (id) => {
    //    const swalWithBootstrapButtons = Swal.mixin({
    //      customClass: {
    //        confirmButton: "btn btn-success",
    //        cancelButton: "btn btn-danger",
    //      },
    //      buttonsStyling: false,
    //    });
    //    await
    //    swalWithBootstrapButtons
    //      .fire({
    //        title: "Are you sure?",
    //        text: "You won't be able to revert this!",
    //        icon: "warning",
    //        showCancelButton: true,
    //        confirmButtonText: "Yes, delete it!",
    //        cancelButtonText: "No, cancel!",
    //        reverseButtons: true,
    //      })
    //      .then((result) => {
    //        if (result.isConfirmed) {
    //    axios.delete(`${urlBase}/${id}`);
    //          swalWithBootstrapButtons.fire({
    //            title: "Deleted!",
    //            text: "Your file has been deleted.",
    //            icon: "success",
    //          });
    //        } else if (
    //          /* Read more about handling dismissals below */
    //          result.dismiss === Swal.DismissReason.cancel
    //        ) {
    //          swalWithBootstrapButtons.fire({
    //            title: "Cancelled",
    //            text: "Your imaginary file is safe :)",
    //            icon: "error",
    //          });
    //        }
    //      });
    //             cargarEmpleados();
    //  }
  

  return (
    //aqui se usa classname para usar bootstrap
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema Recurso Humanos</h3>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            //Iteramos el arreglo de empleados
            empleados.map((empleado, indice) => (
              <tr key={indice}>
                <th scope="row">{empleado.id}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>
                  <NumericFormat
                    value={empleado.sueldo} //se importa numeric forma instalandolo con react-number-format y se le da formato al varlo de sueldo
                    displayType={"text"}
                    thousandSeparator=","
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale
                  ></NumericFormat>
                </td>
                <td>
                  <div>
                    <Link
                      to={`/editar/${empleado.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </Link>
                  </div>
                </td>
                <td>
                  <div>
                    <button
                     onClick={() => eliminarEmpleado(empleado.id)}
                      className="btn btn-danger btn-sm"
                    >Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
