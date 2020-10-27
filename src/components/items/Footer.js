import React, { Fragment } from "react";
import "../../sheet_page/scss/item/footer.scss";
const Footer = () => {
  return (
    <Fragment>
      <footer class="page-footer teal darken-1">
        <div class="container footer-principal">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text texto-footer">
                Sistema de Registro de Docente
              </h5>
              <p class="grey-text text-lighten-4">
                Sistema de control de asistencia virtual docente.
              </p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Links</h5>
              <ul>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Pagina Oficial Carrera de Ingenieria Electrónica
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            © 2020 Copyright Desarrollado <strong>Minus Maya</strong>
            <a class="grey-text text-lighten-4 right" href="#!">
              Minus Maya
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
