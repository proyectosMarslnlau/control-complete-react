import React, { Fragment, useEffect, useState } from "react";
import "../../sheet_page/scss/item/navbar.scss";
//Importamos la libreria M
import M from "materialize-css";
//Importamos LINK
import { Link, Redirect } from "react-router-dom";
//Importamos Sweet ALERT
import Swal from "sweetalert2";

//++++++++++++++++++++++++++++++++++++++++++++
const NavBar = () => {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
  }, []);
  const [redireccionar, guardarRedireccionar] = useState(false);

  const cerrarSesion = () => {
    Swal.fire({
      title: "Cerrar Sesion",
      text: "Esta seguro de Salir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar Sesion",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Correcto", "Sesion Cerrada", "success");
        localStorage.removeItem("datosLogueo");
        localStorage.removeItem("datosIniciales");
        guardarRedireccionar(true);
      }
    });
  };
  return (
    <Fragment>
      {redireccionar ? <Redirect to="/" /> : null}
      <div className="contenedor-navbar">
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Sist. Docente
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/upload">Subir Excel</Link>
              </li>
              <li>
                <Link to="/information">Información Docente</Link>
              </li>
              <li>
                <Link to="/download">Informes</Link>
              </li>
              <li>
                <Link to="/plataform">Plataformas</Link>
              </li>
              <li>
                <a onClick={cerrarSesion}>Cerrar Sesion</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <a href="collapsible.html">Javascript</a>
          </li>
          <li>
            <a href="mobile.html">Mobile</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
