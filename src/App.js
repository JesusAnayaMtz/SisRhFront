import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";

function App() {
  return (
    //todo debe estar dentro de un div ya que react lo pide
    //agregamos el componente listado de empleados como pag de inicio dentro del componente route el cual se instalo con  npm i react-router-dom para manejo de las rutas de la navegacion
    //agregamos el componente de navegacion pero ese se queda fuera de routes
    <div className="container">
      <BrowserRouter>
        <Navegacion></Navegacion>
        <Routes>
          <Route
            exact
            path='/'
            element={<ListadoEmpleados></ListadoEmpleados>}
          ></Route>
          <Route
            exact
            path='/agregar'
            element={<AgregarEmpleado></AgregarEmpleado>}
          ></Route>
          <Route exact path='/editar/:id' element={<EditarEmpleado></EditarEmpleado>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
